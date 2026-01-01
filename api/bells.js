import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "data", "bells.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const { name } = req.query;

    if (name) {
      const decodedName = decodeURIComponent(name).toLowerCase();

      const result = data.filter(bell =>
        bell.name.toLowerCase().includes(decodedName)
      );

      return res.status(200).json(result);
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: "Server error",
      message: err.message
    });
  }
}
