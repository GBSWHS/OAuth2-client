import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function dashAuthApi (req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query
  if (!code) return res.send({ success: false, message: 'code not provided' })
  const url = new URL(req.headers.referer, 'http://example.com')
  const data = await fetch(url.origin + '/api/ident', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      code,
      client_id: '0',
      redirect_uri: '/dash',
      grant_type: 'authorization_code',
      client_secret: process.env.INIT_CLIENT_KEY
    })
  }).then((res) => res.json())

  const { success, user } = data
  const token = user ? jwt.sign({ id: user.id }, process.env.INIT_CLIENT_KEY, { expiresIn: '1h' }) : null

  return res.send({ success, token })
}
