import "dotenv/config";
import express from "express";
import cors from "cors";

import { router as embedRouter } from "./routes/embeb";

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());
app.use(embedRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
