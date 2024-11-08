import { useDispatch } from "react-redux";
import { deleteTodoThunk, markCompleteThunk } from "../features/todoSlice";
import { Todo } from "../types";
import { AppDispatch } from "../app/store";
import formatDate from "../../utils/formatDate";

export default function TodoItem({
  task_id,
  completed,
  task_name,
  deadline,
  task_description,
  priority_level,
}: Todo) {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    dispatch(deleteTodoThunk({ task_id: task_id }));
  };

  const handleCompleteButton = () => {
    dispatch(markCompleteThunk({ task_id: task_id, completed: !completed }));
  };
  return (
    <li className="list-none my-4 p-[2px] bg-gradient-to-b from-[#3742a2] via-70% via-[#6b2790] to-[#782769] rounded-[20px]">
      <div className="border border-gray-700 card w-96 bg-slate-800 text-neutral-content">
        <div className="card-body items-center text-center gap-y-2">
          <div
            className={`badge badge-primary text-gray-300 font-semibold border-red-400 self-start ${
              priority_level === "HIGH"
                ? "bg-red-500 border-red-500"
                : priority_level === "NORMAL"
                ? "bg-yellow-600 border-yellow-600"
                : "bg-gray-700 border-gray-500"
            }`}
          >
            {priority_level}
          </div>
          <div className="self-start">
            <p className="text-xs text-gray-400">
              Deadline: {formatDate(deadline)}
            </p>
          </div>
          <div className="collapse collapse-arrow bg-slate-900">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              <h2 className="card-title">{task_name}</h2>
            </div>
            <div className="collapse-content">
              <p>{task_description}</p>
            </div>
          </div>
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
