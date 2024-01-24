import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoThunk } from "../features/todo/todoSlice";

export default function AddTodoForm() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      dispatch(addTodoThunk({ title: value }));
    }
  };

  return (
    <form className="bg-opacity-0" onSubmit={handleSubmit}>
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
