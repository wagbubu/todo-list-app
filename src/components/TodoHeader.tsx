import supabase from "../../utils/createSupabaseClient";

export default function TodoHeader() {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if(error) {
      throw new Error(error.message)
    }
  };
  return (
    <>
      <div className="bg-gradient-to-b from-[#2b3744] via-90% via-[#182431] to-[#171f29] w-full max-w-md fixed top-0 py-4 flex flex-col items-center rounded-xl border-b-[1px] z-10 shadow-xl border-gray-700 px-6">
        <button
          onClick={handleLogout}
          className="btn btn-sm btn-outline btn-ghost self-end"
        >
          Log out
        </button>
        <h1 className="stat-value mb-4">To Do List</h1>
      </div>
    </>
  );
}
