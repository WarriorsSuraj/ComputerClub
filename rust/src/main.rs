// redo entirely, but the redis client does work

use core::result::Result::{Err, Ok};
use axum::{
    routing::get,
    Router,
    response::IntoResponse,
    http::{StatusCode, header::CONTENT_TYPE},
};
use std::{env, fs};
use dotenvy::dotenv;
use simple_redis::RedisError;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let _ = dotenv();

    let app = Router::new().route("/{va}", get(handle_get));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();

    Ok(())
}

async fn handle_route(path: String) -> Result<Option<String>, RedisError> {
    let mut client = simple_redis::create(&env::var(String::from("RUST_REDIS_URL")).expect("no redis url provided for rust system"))?;
    let val = client.get_string(&path)?;

    Ok(Some(val))
}

use axum::extract::Path;

async fn handle_get(Path(va): Path<String>) -> impl IntoResponse {
    match handle_route(va).await {
        Ok(Some(file_path)) => {
            match fs::read_to_string(file_path) {
                Ok(content) => (StatusCode::OK, [(CONTENT_TYPE, "text/plain")], content).into_response(),
                Err(_) => (StatusCode::NOT_FOUND, "File not found").into_response(),
            }
        },
        Ok(None) => (StatusCode::NOT_FOUND, "Path not found in database").into_response(),
        Err(_) => (StatusCode::INTERNAL_SERVER_ERROR, "Database error").into_response(),
    }
}