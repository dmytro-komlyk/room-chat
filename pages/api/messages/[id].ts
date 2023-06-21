import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteMessage,
  getMessage,
  putMessage,
} from '../../../controllers/messageControllers';
import { connectToMongoDB } from '../../../lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectToMongoDB().catch(() =>
    res.status(405).json({ error: 'Connection Failed...!' })
  );

  const { method, query } = req;

  switch (method) {
    case 'GET':
      getMessage(req, res);
      break;
    case 'POST':
      res
        .status(403)
        .end('POST operation not supported on /messages/' + query.id);
      break;
    case 'PUT':
      putMessage(req, res);
      break;
    case 'DELETE':
      deleteMessage(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowd`);
  }
};

export default handler;
