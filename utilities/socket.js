let io;

module.exports = {
    init: (server) => {
        io = new (require("socket.io").Server)(server);
        return io;
    },
    getIO: () => {
        if (!io) {
            throw new Error("Socket.io not initialized!");
        }
        return io;
    }
}