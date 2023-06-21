import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteChat,
  getChat,
  putChat,
} from '../../../controllers/chatControllers';
import { connectToMongoDB } from '../../../lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectToMongoDB().catch(() =>
    res.status(405).json({ error: 'Connection Failed...!' })
  );

  const { method, query } = req;

  switch (method) {
    case 'GET':
      getChat(req, res);
      break;
    case 'POST':
      res.status(403).end('POST operation not supported on /сhats/' + query.id);
      break;
    case 'PUT':
      putChat(req, res);
      break;
    case 'DELETE':
      deleteChat(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowd`);
  }
};

export default handler;
