import express from "express";
import { comment } from "../controllers/comment.js";

const router = express.Router();

router.post("/add", comment);

export default router;
