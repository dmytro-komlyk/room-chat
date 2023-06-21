import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteContact,
  getContact,
} from '../../../controllers/contactControllers';
import { connectToMongoDB } from '../../../lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectToMongoDB().catch(() =>
    res.status(405).json({ error: 'Connection Failed...!' })
  );

  const { method, query } = req;

  switch (method) {
    case 'GET':
      getContact(req, res);
      break;
    case 'POST':
      res
        .status(403)
        .end('POST operation not supported on /contacts/' + query.id);
      break;
    case 'PUT':
      res
        .status(403)
        .end('PUT operation not supported on /contacts/' + query.id);
      break;
    case 'DELETE':
      deleteContact(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowd`);
  }
};

export default handler;
