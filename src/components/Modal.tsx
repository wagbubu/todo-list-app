import { useDispatch, useSelector } from "react-redux";
import AddTodoForm from "./AddTodoForm";
import ReactModal from "react-modal";
import { AppState } from "../types";
import { hideAddTodoForm } from "../features/todoSlice";

export default function Modal() {
  const dispatch = useDispatch();
  const showModal = useSelector((state: AppState) => state.todos.showAddForm);
  const customStyles = {
    content: {
      background: "#2b3744",
      border: "none",
      margin: "auto",
      padding: "0px",
      borderRadius: "16px",
      width: "max-content",
      height: "max-content",
    },
    overlay: {
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,.5)",
      zIndex: 1000,
      padding: "0px",
    },
  };
  return (
    <ReactModal
      style={customStyles}
      isOpen={showModal}
      shouldCloseOnEsc={true}
      shouldReturnFocusAfterClose={false}
      onRequestClose={() => dispatch(hideAddTodoForm())}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
    >
      <div className="bg-gradient-to-b from-[#2b3744] via-90% via-[#182431] to-[#171f29] w-96 max-w-md py-6 flex flex-col items-center rounded-xl border-b-[1px]  shadow-xl border-gray-700">
        <AddTodoForm></AddTodoForm>
      </div>
    </ReactModal>
  );
}
