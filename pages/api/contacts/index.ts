import { NextApiRequest, NextApiResponse } from 'next';
import {
  getContacts,
  postContact,
} from '../../../controllers/contactControllers';
import { connectToMongoDB } from '../../../lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectToMongoDB().catch(() =>
    res.status(405).json({ error: 'Connection Failed...!' })
  );

  const { method } = req;

  switch (method) {
    case 'GET':
      getContacts(req, res);
      break;
    case 'POST':
      postContact(req, res);
      break;
    case 'PUT':
      res.status(403).end('PUT operation not supported on /contacts');
      break;
    case 'DELETE':
      res.status(403).end('DELETE operation not supported on /contacts');
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowd`);
  }
};

export default handler;
