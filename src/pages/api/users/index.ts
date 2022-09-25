// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { auth, firestore } from "firebase-app/admin";
import { auth as firebaseAuth } from "firebase-app/init";
import { sendPasswordResetEmail } from "firebase/auth";

import { USERS_COLLECTION } from "constants/collection";
import { User } from "models/model";

type Data = {
  message?: string;
  success?: boolean;
  id?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { email, fullName } = req.body;
  const { userId } = req.query;

  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ message: "Authorization header not found." });
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Bearer token not found." });
  }

  try {
    const { uid } = await auth.verifyIdToken(token);

    const userRef = firestore.collection(USERS_COLLECTION).doc(uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      return res.status(401).json({ message: `Error - user don't have required permissions` });
    } else {
      const user = doc.data() as User;
      //if user role isn't manager, user don't have necessary permissions
      if (user.role !== "manager") {
        return res.status(401).json({ message: `Error - user don't have required permissions` });
      }
    }

    if (req.method === "POST") {
      try {
        //CREATE USER...
        const userRecord = await auth.createUser({
          email: email,
          displayName: fullName,
          password: Math.random().toString(36).slice(2), //generate random password, we'd send a password reset email..
        });

        await sendPasswordResetEmail(firebaseAuth, email);

        return res.status(200).json({ id: userRecord.uid, success: true });
      } catch (error) {
        return res.status(500).json({ message: `Error while creating user. Error: ${error}` });
      }
    } else if (req.method === "DELETE") {
      //DELETE USER...
      await auth.deleteUser(userId);
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    return res.status(401).json({ message: `Error while verifying token. Error: ${error}` });
  }
}
