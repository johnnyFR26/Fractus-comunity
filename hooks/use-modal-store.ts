import { Server } from "@prisma/client";
import {create} from "zustand";

export type ModalType = "createServer" | "invite"

interface ModalData{
    server?: Server
}

interface ModalStore{
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    type: null,
    isOpen: false,
    data: {},
    onOpen: (type, data={}) => set({data, type, isOpen: true}),
    onClose: () => set({type: null, isOpen: false}),
}))