export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Greetings from The Office Quotes Game!' })
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
  
}
