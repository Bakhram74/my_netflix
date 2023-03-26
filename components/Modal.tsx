import React from 'react';
import {ModalUnstyled} from "@mui/base";
import {useRecoilState, useRecoilValue} from "recoil";
import {modalState} from "@/atoms/modalAtom";

const Modal = () => {
    const [showModal,setShowModal] = useRecoilState(modalState)
const handleClose=()=>{
    setShowModal(false)
}
    return (
        <ModalUnstyled open={showModal} onClose={handleClose}>
            Modal
        </ModalUnstyled>
    );
};

export default Modal;