import mongoose from "mongoose";
import Todo from "../models/todomodels.js";

// add Todo
const addTodo = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: "Title and description are required",
    });
  }
  const todo = await Todo.create({
    title,
    description,
  });
  return res.status(200).json({
    success: true,
    message: "Todo added successfully",
    todo,
  });
};

// get all Todo
const getTodos = async (req, res) => {
  const todos = await Todo.find({});
  if (!todos) {
    return res.status(404).json({
      success: false,
      message: "No todos found",
    })
  }

  res.send(todos);
};

// get Single Todo 
const getTodoWithId = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      message: "Not Valid ID"
    })
    return;
  }
  const todo = await Todo.findById(id);
  if (!todo) {
    res.status(404).json({
      message: `No todo with id : ${id}`
    })
    return;
  }

  res.status(200).json({
    message: "Todo found",
    todo: todo,
  })

}

// Update Todo 
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Not Valid ID",
      });
    }
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }
    const todo = await Todo.findOneAndUpdate(
      { _id: id },
      { title, description },
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: `No todo with id: ${id}`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};



// Delete Todo 
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      message: "Not Valid ID"
    })
    return;
  }

  const todo = await Todo.findByIdAndDelete({ _id: id });
  if (!todo) {
    res.status(404).json({
      message: `No todo with id : ${id}`
    })
    return;
  }

  res.status(200).json({
    message: "Todo deleted successfully",
    todo: todo,
  })

}


export { addTodo, getTodos, getTodoWithId, updateTodo, deleteTodo };