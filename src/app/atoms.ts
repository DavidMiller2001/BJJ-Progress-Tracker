import { atom } from "jotai";

export const selectedDateAtom = atom<Date | undefined>(new Date());
