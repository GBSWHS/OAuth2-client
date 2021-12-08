import { NextApiHandler } from "next"

const handler: NextApiHandler = async (req, res) => {
  const data = await fetch(process.env.BACKEND_URI + '/internal/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  }).then((res) => res.json())

  return res.send(data)
}

export default handler
