import { useDispatch } from "react-redux";
import { showAddTodoForm } from "../features/todoSlice";

interface Props {
  className?: string;
}

export default function AddButton({ className }: Props) {
  const dispatch = useDispatch();
  const handleAddButton = () => {
    dispatch(showAddTodoForm());
  };
  return (
    <button
      onClick={handleAddButton}
      className={`btn btn-primary rounded-full w-20 h-20 text-white text-7xl font-extralight ${className}`}
    >
      +
    </button>
  );
}
