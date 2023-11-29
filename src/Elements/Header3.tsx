import React, {useContext} from "react";
import { ThemeContext } from "../Contexts/ThemeContext";

interface Header3Props {
  title: string
  alignment?: string
  padding?: boolean
}

export const Header3 = (props: Header3Props) => {
  // @ts-ignore
  const { theme } = useContext(ThemeContext);
  const { title, alignment, padding } = props;

  return (
    <header className={
      `justify-${alignment ? alignment : 'center'}
      flex py-4 text-md xl:text-lg font-bold items-center`
    }>
      <div className="flex justify-center items-center h-10">
        <p className={`${theme === 'dark' ? 'text-white' : 'text-black'} uppercase text-center whitespace-nowrap transform delay-500 duration-1000`}>
          {title}
        </p>
      </div>
    </header>
  )
}