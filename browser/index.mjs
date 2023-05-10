// This is a node server that serves static files in the project
// directory
import path from 'path';
import fs from 'fs';
import http from 'http';

const supportedMimeTypes = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    json: 'application/json',
    bin: 'application/octet-stream',
    html: 'text/html'
};

const server = http.createServer((req, res) => {
    const urlPath = req.url.substring(1);
    const extension = path.extname(urlPath).substring(1);
    const mime = supportedMimeTypes[extension];
    if (!mime) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 404: 'File not found' }));
    }
    const fullPath = path.resolve(urlPath);
    fs.readFile(fullPath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 404: 'File not found' }));
        } else {
            res.writeHead(200, { 'Content-Type': mime });
            res.end(data);
        }
    });
});

server.listen(3000, () => console.log('server running on port 3000'));
process.on('SIGTERM', () => {
    server.close(() => console.log('server stopped successfully'));
});
process.on('SIGINT', () => {
    server.close(() => console.log('server stopped successfully'));
})