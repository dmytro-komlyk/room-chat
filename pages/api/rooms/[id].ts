import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteRoom,
  getRoom,
  putRoom,
} from '../../../controllers/roomControllers';
import { connectToMongoDB } from '../../../lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectToMongoDB().catch(() =>
    res.status(405).json({ error: 'Connection Failed...!' })
  );

  const { method, query } = req;

  switch (method) {
    case 'GET':
      getRoom(req, res);
      break;
    case 'POST':
      res.status(403).end('POST operation not supported on /rooms/' + query.id);
      break;
    case 'PUT':
      putRoom(req, res);
      break;
    case 'DELETE':
      deleteRoom(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method $ {method} Not Allowd`);
  }
};

export default handler;
