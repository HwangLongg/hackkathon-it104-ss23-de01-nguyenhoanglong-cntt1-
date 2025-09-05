import { Checkbox, Space, Button } from "antd";
import { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  return (
    <Space className="w-full flex justify-between items-center">
      <Checkbox checked={todo.completed} onChange={onToggle}>
        <span className={todo.completed ? "line-through opacity-70" : ""}>
          {todo.text}
        </span>
      </Checkbox>
      <Space>
        <Button type="link" onClick={onEdit}>
          Edit
        </Button>
        <Button type="link" danger onClick={onDelete}>
          Delete
        </Button>
      </Space>
    </Space>
  );
}

