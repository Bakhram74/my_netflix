import {atom} from "recoil";
import {Movie} from "@/typing";
import {DocumentData} from "@firebase/firestore";

export const modalState = atom({
    key: 'modal',
    default: false,
});
export const movieState = atom<Movie|null|DocumentData>({
    key: 'movie',
    default: null,
});