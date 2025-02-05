import React from "react";
import { HeaderProps } from "../types";

const Header = ({
  name,
  buttonComponent,
  isSmallText = false,
}: HeaderProps) => {
  return (
    <div className="mb-5 flex w-full items-center justify-between">
      <h1
        className={`${isSmallText ? "text-lg" : "text-2xl"} font-semibold  dark:text-white`}
      >
        {name}
      </h1>
      {buttonComponent}
    </div>
  );
};

export default Header;
