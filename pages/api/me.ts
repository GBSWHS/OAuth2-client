import { NextApiRequest, NextApiResponse } from 'next'

export default async function dashAuthApi (req: NextApiRequest, res: NextApiResponse) {
  const data = await fetch(process.env.BACKEND_URI + '/internal/me', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': req.headers.authorization
    }
  }).then((res) => res.json())
  return res.status(200).send(data)
}
