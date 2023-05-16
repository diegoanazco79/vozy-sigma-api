import { Router } from "express";
import { getEmbedUrl } from "../controllers/embed";

const router = Router();

router.get("/embed", getEmbedUrl);

export { router };
