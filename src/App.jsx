import ToDoHeader from "./components/ToDoHeader";
import ToDoItem from "./components/ToDoItem";
import TotalCompletedItems from "./components/TotalCompletedItems";

export default function App() {
  return (
    <>
      <ToDoHeader></ToDoHeader>
      <ToDoItem></ToDoItem>
      <ToDoItem></ToDoItem>
      <ToDoItem></ToDoItem>
      <TotalCompletedItems></TotalCompletedItems>
    </>
  );
}
