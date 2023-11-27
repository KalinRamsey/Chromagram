import React, { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";

interface Header4Props {
  title: string
  alignment?: string
  padding?: boolean
}

export const Header4 = (props: Header4Props) => {
  // @ts-ignore
  const { theme } = useContext(ThemeContext);
  const { title, alignment, padding } = props;

  return (
    <header className={`justify-${alignment ? alignment : 'center'} items-center flex w-full py-4 text-md xl:text-lg font-bold`}>
      <div className={`${theme === 'dark' ? 'border-white' : 'border-black'} flex justify-center items-center h-1 w-full border-b-2`} />
      <p className={`${theme === "dark" ? "text-white" : 'text-black'} uppercase text-center w-10 h-10 p-4 rounded-full flex justify-center items-center border-2`}>
        {title}
      </p>
    </header>
  )
}