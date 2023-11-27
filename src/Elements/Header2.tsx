import React, {useContext} from "react";
import { ThemeContext } from "../Contexts/ThemeContext";

interface Header2Props {
  title: string
  alignment?: string
}

export const Header2 = (props: Header2Props) => {
  // @ts-ignore
  const { theme } = useContext(ThemeContext);
  const { title, alignment } = props;

  return (
    <header className={`justify-${alignment ? alignment : 'center'} flex w-full text-xl xl:text-3xl font-bold`}>
      <p className={`${theme === 'dark' ? 'text-white' : 'text-black'} uppercase text-center transform duration-[3000ms]`}>
        {title}
      </p>
    </header>
  )
}