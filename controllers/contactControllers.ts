import { NextApiRequest, NextApiResponse } from 'next';
import Contact from '../models/contact';
import User from '../models/user';

export const getContacts = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(404).json({ error: 'Query not Found!' });
    const contacts = await Contact.find({ userId });
    if (!contacts) return res.status(404).json({ error: 'Data not Found!' });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const postContact = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { userId, contactId } = req.body;
    if (userId && contactId) {
      const { userName, nickName, email, image } = await User.findById(
        contactId
      );
      const formData = { userId, contactId, userName, nickName, email, image };

      const data = await Contact.create(formData);
      return res.status(201).json(data);
    } else {
      res.status(404).json({ error: 'User Not Selected' });
    }
  } catch (error) {
    return res.status(404).json({ error });
  }
};

export const getContact = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(404).json({ error: 'Contact Not Found!' });
    const contact = await Contact.findById(id);
    res.status(200).json(contact);
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const deleteContact = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(404).json({ error: 'Contact Not Selected' });
    const { _id } = await Contact.findByIdAndDelete(id);
    res.status(200).json({ deleted: _id });
  } catch (error) {
    return res.status(404).json({ error });
  }
};
