import React from "react";
import ReactDOM from "react-dom/client";

const App = () => {
    return <h1>hello react world!</h1>
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);