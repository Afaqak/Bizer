import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

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
    <motion.button
      onClick={onClick}
      className={cn(
        "relative bg-[#4AFA4A] text-black font-bold h-12 w-fit p-4 items-center flex rounded-full transition-all duration-300 overflow-hidden",
        "hover:bg-[#3ED63E] hover:shadow-[0_0_15px_rgba(74,250,74,0.5)]",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-[200%] before:transition-transform before:duration-700",
        className
      )}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  );
};
