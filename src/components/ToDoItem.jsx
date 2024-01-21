export default function ToDoItem() {
  return (
    <div className="card w-96 bg-neutral text-neutral-content">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Todo Title</h2>
        <p>Todo description Lorem Ipsum Dolor Sit</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Done!</button>
          <button className="btn btn-secondary">Delete</button>
        </div>
      </div>
    </div>
  );
}
