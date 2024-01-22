import AddTodoForm from "./AddTodoForm";

export default function TodoHeader() {
  return (
    <>
      <div className="w-full max-w-md bg-[#1D232A] z-10 fixed top-0 py-4 flex flex-col items-center rounded-xl border-b-[1px] border-r-[1px] border-l-[1px] shadow-xl border-gray-900">
        <h1 className="stat-value mb-4">To Do List</h1>
        <AddTodoForm></AddTodoForm>
      </div>
    </>
  );
}
