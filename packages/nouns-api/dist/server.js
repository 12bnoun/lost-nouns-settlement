"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const config_1 = require("./config");
/**
 * Create the HTTP server
 * @param app The express application
 */
const createServer = (app) => {
    const server = app.listen(config_1.config.serverPort, () => {
        console.info(`HTTP service listening on 0.0.0.0:${config_1.config.serverPort}`);
    });
    let connections = [];
    server.on('connection', (connection) => {
        connections.push(connection);
        connection.on('close', () => (connections = connections.filter((curr) => curr !== connection)));
    });
    const handles = {
        shutdown: () => {
            console.info('Received kill signal, shutting down gracefully');
            server.close(() => {
                console.info('Closed out remaining connections');
                process.exit(0);
            });
            setTimeout(() => {
                console.error('Could not close connections in time, forcefully shutting down');
                process.exit(1);
            }, 10000);
            connections.forEach((curr) => curr.end());
            setTimeout(() => connections.forEach((curr) => curr.destroy()), 5000);
        },
    };
    process.on('SIGTERM', handles.shutdown);
    process.on('SIGINT', handles.shutdown);
    return server;
};
exports.createServer = createServer;
