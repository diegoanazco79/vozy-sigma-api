"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const embed_1 = require("../controllers/embed");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/embed", embed_1.getEmbedUrl);
