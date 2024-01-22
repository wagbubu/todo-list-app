/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { deleteTodo, markComplete } from "../features/todo/todoSlice";

export default function TodoItem({ id, completed, title }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTodo({ id }));
  };

  const handleCompleteButton = () => {
    dispatch(markComplete({ id, completed: !completed }));
  };
  return (
    <li className="list-none my-4">
      <div className="border border-gray-700 card w-96 bg-neutral text-neutral-content">
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
