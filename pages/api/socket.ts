import { NextApiResponseServerIO } from '@/common/types/next';
import { Server as NetServer } from 'http';
import { NextApiRequest } from 'next';
import { Server as ServerIO } from 'socket.io';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log('New Socket.io server...');
    // adapt Next's net Server to http Server
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: '/api/socket_io',
      addTrailingSlash: false,
    });
    // append SocketIO server to Next.js socket server response
    io.on('connection', (socket) => {
      console.log('Connected socket.io');
      socket.broadcast.emit('a user connected');
      socket.on('hello', () => {
        socket.emit('hello', 'world!');
      });
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
    res.socket.server.io = io;
  } else {
    console.log('socket.io already running');
  }
  res.end();
};

export default handler;
