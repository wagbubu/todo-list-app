import AddButton from "./AddButton";
import Modal from "./Modal";
import TodoHeader from "./TodoHeader";
import TodoList from "./TodoList";
import TotalCompletedItems from "./TotalCompletedItems";

export default function TodoApp() {
  return (
    <div className="relative mx-auto py-4 max-w-md flex flex-col items-center">
      <TodoHeader></TodoHeader>
      <TodoList></TodoList>
      <Modal></Modal>
      <AddButton className="fixed bottom-36 left-[calc(50%+8rem)]" />
      <TotalCompletedItems></TotalCompletedItems>
    </div>
  );
}
