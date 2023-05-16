import { Router } from "express";
import { getEmbedUrl } from "../controllers/embed";

const router = Router();

router.post("/embed", getEmbedUrl);

export { router };
