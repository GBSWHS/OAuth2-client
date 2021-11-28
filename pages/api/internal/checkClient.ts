import { NextApiRequest, NextApiResponse } from 'next'

export default async function dashAuthApi (req: NextApiRequest, res: NextApiResponse) {
  const url = new URL(req.url, 'http://example.com')
  const data = await fetch(process.env.BACKEND_URI + '/internal/check?' + url.searchParams.toString(), {
    headers: {
      Authorization: req.headers.authorization
    }
  }).then((res) => res.json())
  return res.send(data)
}
