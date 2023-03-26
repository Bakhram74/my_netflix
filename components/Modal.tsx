import React from 'react';
import {useRecoilState} from "recoil";
import {modalState} from "@/atoms/modalAtom";
import {
XIcon
} from '@heroicons/react/outline'

 function Modal() {
    const [showModal,setShowModal] = useRecoilState(modalState)
    const handleClose=()=>{
        setShowModal(false)
    }

    return (
        <div>
            <button
                className="modalButton absolute right-5 top-5 !z-50 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
                onClick={handleClose}
            >
                <XIcon className="h-6 w-6" />
            </button>
        </div>


    );
}


export default Modal;