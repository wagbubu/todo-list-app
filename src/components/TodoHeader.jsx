import AddTodoForm from "./AddTodoForm";

export default function TodoHeader() {
  return (
    <>
      <div className="bg-gradient-to-b from-[#2b3744] via-90% via-[#182431] to-[#171f29] w-full max-w-md z-10 fixed top-0 py-4 flex flex-col items-center rounded-xl border-b-[1px]  shadow-xl border-gray-700">
        <h1 className="stat-value mb-4">To Do List</h1>
        <AddTodoForm></AddTodoForm>
      </div>
    </>
  );
}
