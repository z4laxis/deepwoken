import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "data", "bells.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  res.status(200).json(data);
}