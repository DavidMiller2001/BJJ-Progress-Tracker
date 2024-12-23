import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  const charArr = str.split("");
  charArr[0] = (charArr[0] ?? "").toUpperCase();
  let formattedStr = "";
  formattedStr = charArr.join("");
  return formattedStr;
}
