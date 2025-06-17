import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const tw = (...inputs: Parameters<typeof clsx>) => twMerge(clsx(inputs))