import { Input, Button, Space } from "antd";

interface TodoInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  editing: boolean;
}

export default function TodoInput({ value, onChange, onSubmit, editing }: TodoInputProps) {
  return (
    <Space.Compact style={{ width: "100%" }}>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add to the todo list"
      />
      <Button type="primary" onClick={onSubmit}>
        {editing ? "Update" : "Add"}
      </Button>
    </Space.Compact>
  );
}

