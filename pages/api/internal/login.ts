import { NextApiRequest, NextApiResponse } from 'next'

export default async function dashAuthApi (req: NextApiRequest, res: NextApiResponse) {
  const data = await fetch(process.env.BACKEND_URI + '/internal/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  }).then((res) => res.json())

  return res.send(data)
}
