import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: string[]) => twMerge(clsx(inputs));

export default cn;
