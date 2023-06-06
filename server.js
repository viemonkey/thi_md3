const http = require("http");
const router = require('./src/controller/router');
const handleError = require('./src/controller/handle/errorController');
const server = http.createServer((req, res) => {
    let url = req.url;
    let arrPath = url.split('/');
    let path = arrPath[1];
    let id = -1;
    if (arrPath.length > 2) {
        path = arrPath[1];
        id = arrPath[2]
    }
    if (arrPath.length <= 2) {
        path = arrPath[1]
    }
    let chosenHandle; 
    if (router[path] !== undefined) {
        chosenHandle = router[path]
    } else {
        chosenHandle = handleError.showNotFound
    }
    chosenHandle(req, res, id);
});
server.listen(8000, "localhost", () => {
    console.log("Server is running port 8000");
})