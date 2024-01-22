import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

export default function AddTodoForm() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo({ title: value }));
    setValue("");
  };

  return (
    <form className="bg-[#1D232A]" onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={handleChange}
        type="text"
        placeholder="Type here"
        className="bg-[#1D232A] input input-bordered input-primary mx-2 max-w-xs"
      />
      <button type="submit" className="btn btn-primary">
        Add
      </button>
    </form>
  );
}
