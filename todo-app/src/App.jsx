import axios from "axios";
import { useState, useRef, useEffect } from "react";

const App = () => {
  const [todo, setTodo] = useState([]);
  const todoVal = useRef();

  useEffect(() => {
    axios("http://localhost:4000/api/v1/todos")
      .then((res) => {
        console.log(res.data)
        setTodo(res.data); // Update state directly without mutating
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addTodo = (event) => {
    event.preventDefault();
    if (!todoVal) {
      return console.log("add Todo");
    }
    axios
      .post(`http://localhost:4000/api/v1/todo`, {
        title: todoVal.current.value,
        description: "hello world",
      })
      .then((res) => {
        todo.push(res.data.todo);
        setTodo([...todo]);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(todo);

    todoVal.current.value = "";
  };

  const deleteTodo = (index) => {
    console.log("todo deleted", index);
    todo.splice(index, 1);
    setTodo([...todo]);
  };

  const editTodo = (index) => {
    console.log("todo edited", index);
    const editedVal = prompt("Enter new value", todo[index]);
    if (editedVal) {
      todo.splice(index, 1, editedVal);
      setTodo([...todo]);
    }
  };

  return (
    <>
      <div style={styles.container}>
        <h1 style={styles.heading}>Todo App</h1>
        <form onSubmit={addTodo} style={styles.form}>
          <input
            type="text"
            placeholder="Enter todo"
            ref={todoVal}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Add Todo
          </button>
        </form>
        <ul style={styles.todoList}>
          
          {todo.length > 0 && todo.map((item, index) => (
            <div key={item._id} style={styles.todoItem}>
              <li style={styles.todoText}>{item.title}</li>
              <div style={styles.buttonGroup}>
                <button
                  onClick={() => deleteTodo(index)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
                <button
                  onClick={() => editTodo(index)}
                  style={styles.editButton}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "0 auto",
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    width: "70%",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 15px",
    border: "none",
    backgroundColor: "#28a745",
    color: "white",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  todoList: {
    listStyle: "none",
    padding: 0,
  },
  todoItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #ccc",
  },
  todoText: {
    flex: 1,
    textAlign: "left",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  editButton: {
    padding: "5px 10px",
    backgroundColor: "#ffc107",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default App;
