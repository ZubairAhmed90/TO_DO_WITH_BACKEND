import express from "express";
import { addTodo, deleteTodo, getTodos, getTodoWithId, updateTodo } from "../controllers/todocontrollers.js";

const router = express.Router();

router.post("/todo", addTodo);
router.get("/todos", getTodos);
router.get("/todo/:id", getTodoWithId);
router.put("/todo/:id", updateTodo);
router.delete("/todo/:id", deleteTodo);

export default router;