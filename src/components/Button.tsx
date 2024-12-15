import { cn } from "@/lib/utils";
import React from "react";

export const Button = ({
  onClick,
  className,
  children,
}: {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "bg-black text-white font-medium  h-12 w-fit p-4 items-center flex rounded-full",
        className
      )}
    >
      {children}
    </button>
  );
};
