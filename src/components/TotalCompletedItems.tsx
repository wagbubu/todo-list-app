import { useSelector } from "react-redux";
import { AppState } from "../types";

export default function TotalCompletedItems() {
  const todos = useSelector((state: AppState) => state.todos.list);
  const numberOfTasks = [...todos].length;
  const completedTasks = [...todos].filter((todo) => todo.completed == true);

  return (
    <>
      <div className="bg-gradient-to-b from-[#32404e] via-80% via-[#182431] to-[#171f29] w-full max-w-md border-t-[1px] border-gray-600 fixed bottom-0 stats shadow-2xl">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Completed Tasks</div>
          <div className="stat-value text-primary">{completedTasks.length}</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-value">
            {numberOfTasks
              ? Math.floor((completedTasks.length / numberOfTasks) * 100)
              : "0"}
            %
          </div>
          <div className="stat-title">Tasks Done</div>
          <div className="stat-desc text-secondary">
            {numberOfTasks - completedTasks.length + " Tasks Remaining"}
          </div>
        </div>
      </div>
    </>
  );
}
