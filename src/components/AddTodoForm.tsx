import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoThunk, hideAddTodoForm } from "../features/todoSlice";
import { AppDispatch } from "../app/store";
import { AppState } from "../types";
import { PriorityLevel } from "../types";

export default function AddTodoForm() {
  const userId = useSelector((state: AppState) => state.session.auth.user.id);
  const [taskName, setTaskName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [priorityLevel, setPriorityLevel] = useState<PriorityLevel>();

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    dispatch(
      addTodoThunk({
        user_id: userId,
        task_name: taskName,
        task_description: taskDescription,
        deadline: deadline,
        priority_level: priorityLevel,
      })
    );
  };

  return (
    <form
      className="bg-opacity-0 flex flex-col w-full px-6"
      onSubmit={handleSubmit}
    >
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Task name</span>
        </div>
        <input
          name="task_name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          type="text"
          placeholder="Type here"
          className="bg-[#1D232A] input input-bordered input-primary"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Description/Note</span>
        </div>
        <textarea
          name="description"
          className="textarea textarea-primary h-40"
          placeholder="Note"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        ></textarea>
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Deadline</span>
        </div>
        <input
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          name="deadline"
          className="input input-bordered w-full"
          type="date"
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Priority Level</span>
        </div>
        <select
          value={priorityLevel}
          onChange={(e) => setPriorityLevel(e.target.value as PriorityLevel)}
          name="priority"
          className="select select-bordered"
          defaultValue="NORMAL"
        >
          <option value="HIGH">High</option>
          <option value="NORMAL">Normal</option>
          <option value="LOW">Low</option>
        </select>
      </label>

      <div className="flex flex-col gap-4 mt-4">
        <button type="submit" className="btn btn-primary">
          Add
        </button>
        <button
          onClick={() => dispatch(hideAddTodoForm())}
          className="btn-outline btn-secondary btn w-full"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
