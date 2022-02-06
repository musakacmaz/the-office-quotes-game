import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const result = await axios.get("https://officeapi.dev/api/characters");
    res.status(200).json(result.data);
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
