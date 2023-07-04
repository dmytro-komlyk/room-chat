import { hash } from 'bcryptjs';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { IUser } from '../../../common/types';
import { connectToMongoDB } from '../../../lib/mongodb';
import User from '../../../models/user';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectToMongoDB().catch(() => res.json({ error: 'Connection Failed...!' }));

  // only post method is accepted
  if (req.method === 'POST') {
    if (!req.body) return res.status(404).json({ error: 'Data is missing' });

    const { userName, email, password } = req.body;

    // check duplicate users
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({ error: 'User Already exists' });
    } else {
      if (password.length < 6)
        return res
          .status(409)
          .json({ error: 'Password should be 6 characters long' });

      const hashedPassword = await hash(password, 12);

      try {
        const user: IUser = await User.create({
          userName,
          email,
          password: hashedPassword,
        });
        return res.status(201).json({
          success: true,
          user,
        });
      } catch (error: unknown) {
        if (error && error instanceof mongoose.Error.ValidationError) {
          //mongo db will return array
          // but we only want to show one error at a time
          for (let field in error.errors) {
            const msg = error.errors[field].message;
            return res.status(409).json({ error: msg });
          }
        }
      }
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;
