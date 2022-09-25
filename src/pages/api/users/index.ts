// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "firebase-app/admin";

type Data = {
  message?: string;
  email?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { email } = req.body;

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

    if (req.method === "POST") {
      // Process a POST request
      console.log("Creating ", email);
    } else if (req.method === "DELETE") {
      console.log("Deleting ", email);
    }
    res.status(200).json({ email: email as string });
  } catch (error) {
    res.status(401).json({ message: `Error while verifying token. Error: ${error}` });
  }
}
