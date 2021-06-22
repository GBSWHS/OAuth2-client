import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function dashAuthApi (req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization
  if (!token) return res.send({ success: false, message: 'token not provided' })

  const [tokenType, tokenStr] = token.split(' ')
  if (tokenType !== 'Bearer') return res.send({ success: false, message: 'token type not valid' })

  let tokenData
  try {
    tokenData = jwt.verify(tokenStr, process.env.INIT_CLIENT_KEY)
  } catch (_) {
    return res.send({ success: false, message: 'token not valid' })
  }
  

  if (req.method === 'POST') {
    const data = await fetch(process.env.BACKEND_URI + '/internal/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        owner_id: tokenData.id,
        ...req.body
      })
    }).then((res) => res.json())
    return res.send(data)
  }

  const data = await fetch(process.env.BACKEND_URI + '/internal/clients?user=' + tokenData.id).then((res) => res.json())
  return res.send(data)
}
