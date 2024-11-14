import "../css/Modal.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { closeModal } from "../redux/modalSlice";

// Modal component to display messages, controlled by Redux state
const Modal = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isOpen, title } = useSelector((state: RootState) => state.modal);

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{title}</h2>
            {/* Close button dispatches action to hide modal */}
            <button onClick={() => dispatch(closeModal())} className="close">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
