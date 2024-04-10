import { Router } from "express";
import { catchErrors } from "../utils";
import { addMessage } from "../controllers/messageController";

const router = Router();

router.post("/message", catchErrors(addMessage));

export default router;

