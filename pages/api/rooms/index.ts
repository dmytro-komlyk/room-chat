import { NextApiRequest, NextApiResponse } from 'next';
import { getRooms, postRoom } from '../../../controllers/roomControllers';
import { connectToMongoDB } from '../../../lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectToMongoDB().catch(() =>
    res.status(405).json({ error: 'Connection Failed...!' })
  );

  const { method } = req;

  switch (method) {
    case 'GET':
      getRooms(req, res);
      break;
    case 'POST':
      postRoom(req, res);
      break;
    case 'PUT':
      res.status(403).end('PUT operation not supported on /rooms');
      break;
    case 'DELETE':
      res.status(403).end('DELETE operation not supported on /rooms');
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method $ {method} Not Allowd`);
  }
};

export default handler;
