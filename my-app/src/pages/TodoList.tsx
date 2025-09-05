import React, { useState, useEffect } from "react";
import { Card, Space, Typography } from "antd";
import TodoItem from "../components/TodoItem";
import TodoInput from "../components/TodoInput";


const { Title } = Typography;

export interface Todo {
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? (JSON.parse(saved) as Todo[]) : [];
  });

  const [newTodo, setNewTodo] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === "") return;

    if (editingIndex !== null) {
      const updated = [...todos];
      updated[editingIndex].text = newTodo;
      setTodos(updated);
      setEditingIndex(null);
    } else {
      setTodos([...todos, { text: newTodo, completed: false }]);
    }
    setNewTodo("");
  };

  const toggleComplete = (index: number) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const editTodo = (index: number) => {
    setNewTodo(todos[index].text);
    setEditingIndex(index);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card style={{ width: 400 }} bordered={false}>
        <Title level={3} style={{ textAlign: "center" }}>
          Todo List
        </Title>
        <Space direction="vertical" style={{ width: "100%" }}>
          {todos.map((todo, index) => (
            <TodoItem
              key={index}
              todo={todo}
              onToggle={() => toggleComplete(index)}
              onDelete={() => deleteTodo(index)}
              onEdit={() => editTodo(index)}
            />
          ))}
          <TodoInput
            value={newTodo}
            onChange={setNewTodo}
            onSubmit={addTodo}
            editing={editingIndex !== null}
          />
        </Space>
      </Card>
    </div>
  );
}
