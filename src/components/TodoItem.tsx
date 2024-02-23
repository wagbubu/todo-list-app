import { useDispatch } from "react-redux";
import { deleteTodoThunk, markCompleteThunk } from "../features/todo/todoSlice";
import { Todo } from "../features/todo/todoSlice";
import { AppDispatch } from "../app/store";

export default function TodoItem({ id, completed, title }: Todo) {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    dispatch(deleteTodoThunk({ id: id }));
  };

  const handleCompleteButton = () => {
    dispatch(markCompleteThunk({ id: id, completed: !completed }));
  };
  return (
    <li className="list-none my-4 p-[2px] bg-gradient-to-b from-[#3742a2] via-70% via-[#6b2790] to-[#782769] rounded-[20px]">
      <div className="border border-gray-700 card w-96 bg-slate-800 text-neutral-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{title}</h2>
          <div className="card-actions justify-end">
            <button
              onClick={handleCompleteButton}
              className={`btn ${
                completed ? "btn-active btn-ghost" : "btn-primary"
              }`}
            >
              {completed ? "Undo" : "Done!"}
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-outline btn-secondary"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
