import React from "react";
import { AiOutlineArrowDown } from "react-icons/ai";

type ArrowProps = {
  view: boolean;
  toggle: () => void;
};

export const Arrow = ({ view, toggle }: ArrowProps) => {
  return (
    <button onClick={toggle} className="bg-transparent ml-4 outline-none">
      <AiOutlineArrowDown className={view ? "jv-collapse-icon" : "jv-collapse-icon jv-collapse-icon-up"} />
    </button>
  );
};
