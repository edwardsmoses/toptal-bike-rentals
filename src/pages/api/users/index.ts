// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "firebase-app/admin";

type Data = {
  message?: string;
  email?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log(req.headers["userId"]);

  const { email } = req.query;

  const authorization = req.headers.authorization;
  console.log(`Handler auth header: ${authorization}`);

  if (!authorization) {
    return res.status(401).json({ message: "Authorization header not found." });
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Bearer token not found." });
  }

  console.log(`Token: ${token}`);

  try {
    const { uid } = await auth.verifyIdToken("sd" + token);
    console.log(`User uid: ${uid}`);

    if (req.method === "POST") {
      // Process a POST request
      console.log("Creating ", email);
    } else if (req.method === "DELETE") {
      console.log("Deleting ", email);
    }

    res.status(200).json({ email: email as string });
  } catch (error) {
    console.log(`verifyIdToken error: ${error}`);
    res.status(401).json({ message: `Error while verifying token. Error: ${error}` });
  }
}
