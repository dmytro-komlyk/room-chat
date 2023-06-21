import { NextApiRequest, NextApiResponse } from 'next';
import {
  getMessages,
  postMessage,
} from '../../../controllers/messageControllers';
import { connectToMongoDB } from '../../../lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectToMongoDB().catch(() =>
    res.status(405).json({ error: 'Connection Failed...!' })
  );

  const { method } = req;

  switch (method) {
    case 'GET':
      getMessages(req, res);
      break;
    case 'POST':
      postMessage(req, res);
      break;
    case 'PUT':
      res.status(403).end('PUT operation not supported on /messages');
      break;
    case 'DELETE':
      res.status(403).end('DELETE operation not supported on /messages');
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowd`);
  }
};

export default handler;
