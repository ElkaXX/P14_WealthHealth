import "../css/Modal.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { closeModal } from "../redux/modalSlice";

const Modal = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isOpen, title } = useSelector((state: RootState) => state.modal);

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{title}</h2>
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
