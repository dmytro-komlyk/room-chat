import { NextApiRequest, NextApiResponse } from 'next';
import { putMessageReaction } from '../../../controllers/messageControllers';
import { connectToMongoDB } from '../../../lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectToMongoDB().catch(() =>
    res.status(405).json({ error: 'Connection Failed...!' })
  );

  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(403).end('GET operation not supported on /chats/react');
      break;
    case 'POST':
      res.status(403).end('POST operation not supported on /chats/react');
      break;
    case 'PUT':
      putMessageReaction(req, res);
      break;
    case 'DELETE':
      res.status(403).end('DELETE operation not supported on /chats/react');
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowd`);
  }
};

export default handler;
