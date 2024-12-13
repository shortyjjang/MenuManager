import { collapseTailwindClassName } from "@/util/collapseTailwindClassName";
import React from "react";
import Radiobox from "../Radiobox";

export default function Dropdown({
  options,
  value,
  onChange,
  className = "",
}: {
  options: { label: string; value: string | number }[];
  value: string | number;
  onChange: (value: string | number) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      {options.map((option) => (
        <div
          key={option.value}
          className={collapseTailwindClassName([
            "px-3 py-2 w-full whitespace-nowrap flex items-center gap-2 cursor-pointer",
            value === option.value ? "bg-gray-100 text-black" : "text-gray-500 bg-white",
          ])}
          onClick={() => onChange(option.value)}
        >
          <Radiobox checked={value === option.value} />
          {option.label}
        </div>
      ))}
    </div>
  );
}
