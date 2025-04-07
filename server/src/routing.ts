// todo: add db support, use promises, etcetc
// preferably mongodb or something well known and established

export default async function handleRoute(requestedPath: string): Promise<string> {
    return new Promise((res, rej) => {
        res("../../index.html"); // for now just resolve everything to basic path
    });
}