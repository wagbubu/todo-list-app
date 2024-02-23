import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoThunk } from "../features/todo/todoSlice";
import { AppDispatch } from "../app/store";

export default function AddTodoForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (value) {
      dispatch(addTodoThunk({ title: value }));
      setValue("");
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
