import TodoHeader from "./components/TodoHeader";
import TodoList from "./components/TodoList";
import TotalCompletedItems from "./components/TotalCompletedItems";

export default function App() {
  return (
    <>
      <div className="mx-auto py-4 max-w-md flex flex-col items-center">
        <TodoHeader></TodoHeader>
        <TodoList></TodoList>
        <TotalCompletedItems></TotalCompletedItems>
      </div>
    </>
  );
}
