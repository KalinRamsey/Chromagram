import React, { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";

interface Header1Props {
  title: string
}

export const Header1 = (props: Header1Props) => {
  // @ts-ignore
  const { theme } = useContext(ThemeContext);
  const { title } = props;

  return (
    <header className="flex justify-center text-3xl lg:text-5xl font-bold">
      <p className={`${theme === 'dark' ? 'text-white' : 'text-black'} uppercase text-center transform duration-[5000ms]`}>
        {title}
      </p>
    </header>
  )
}