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
  
  const data = await fetch(process.env.BACKEND_URI + '/internal/client?id=' + req.query.id).then((res) => res.json())
  console.log(data)
  if (data.success && data.client.owner_id !== tokenData.id) return res.send({ success: false, message: 'you don\'t have any permission to see client infomations' })

  return res.send(data)
}
