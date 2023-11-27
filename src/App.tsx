import React, { Fragment, useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faHashtag, faLock, faCopy, faCheck, faCheckDouble, faClipboard, faClose,faTriangleCircleSquare, faCheckCircle, faMoon, faSun, faCircle, faFaceAngry, faFaceDizzy, faDashboard, faDharmachakra, faYinYang, faTShirt, faRadiation, faWalkieTalkie, faHamburger } from '@fortawesome/free-solid-svg-icons'


import { Header1 } from './Elements/Header1';

import './App.css';
import { Header2 } from './Elements/Header2';
import { Header3 } from './Elements/Header3';
import { Header4 } from './Elements/Header4';
import { Switch } from '@headlessui/react';
import { ThemeContext } from './Contexts/ThemeContext';

function App() {
  // @ts-ignore
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [hexColor, setHexColor] = useState("");
  
  const [sampleBG, setSampleBG] = useState("");
  const [sampleFG, setSampleFG] = useState("");
  const [lockedColors, setLockedColors] = useState<string[]>([]);
  const [chosenColors, setChosenColors] = useState<string[]>([]);

  const instructions = [
    "Enter a desired color's hexadecimal value in the input field",
    "The given color will populate along both the X Axis (Foreground) and Y Axis (Background) of the Color Manager",
    "Cross-reference the cell displaying your desired background color and foreground color to verify the WCAG certified contrast ratios for healines, text, and graphical elements (in that order)",
    "You can click on the desired background / foreground combination to lock your selection, preventing it from being deleted",
    "You can clear all previously entered colors, except for those locked selections. This should reveal your finalized color palette and the corresponding colors which work well together"
  ]

  const onHexChange = (e: any) => {
    const input = e.currentTarget.value;
    if (/^[a-fA-F0-9]+$/.test(input) || input === "") {
      setHexColor(input);
    }
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color.substring(1))
  }

  const removeColor = (color: string) => {
    if (chosenColors.includes(color)) {
      let filteredColors = chosenColors.filter((c) => c !== color)
      setChosenColors(filteredColors)
    }
  }

  const addRandomColor = () => {
    const hexOptions = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
    
    let randomHexCode = '#';

    let i = 0;
    while (i < 6) {
      randomHexCode += hexOptions[Math.floor(Math.random() * hexOptions.length)]
      i++
    }

    return randomHexCode
  }

  const setRandomColors = () => {
    let randomColors = ["#FFFFFF","","","", "#000000"];

    for (let i = 1; i < 4; i++) {
      randomColors[i] = addRandomColor()
    }
    setChosenColors(randomColors)
  }

  const resetColors = () => {
    setRandomColors();
  }
  
  const clearColors = () => {
    // let unlockedColors = chosenColors.filter((color, i) => !lockedColors.includes(color))
    setChosenColors(lockedColors)
    setLockedColors([])
  }

  const lockColors = (color1: string, color2: string) => {
    console.log('checking locked colors...');

    if (lockedColors.includes(color1)) {
      console.log(color1, 'already locked #1');
    } else {
      setLockedColors((lockedColors) => [...lockedColors, color1])
    }

    if (lockedColors.includes(color2)) {
      console.log(color2, 'already locked #2');
    } else {
      setLockedColors((lockedColors) => [...lockedColors, color2])
    }
  }

  const isLocked = (color: string) => {
    return lockedColors.includes(color)
  }

  const unlockColor = (color: string) => {
    console.log('unlocking color...')
    if (!isLocked(color)) {
      console.log('color not included in locked set!');
      return;
    }

    setLockedColors((colors) => colors.filter((c, i) => c !== color));
  }
  
  const compareColors = (color1: string, color2: string) => {
    let rateWCAG;
    
    // fetch(`https://webaim.org/resources/contrastchecker/?fcolor=${color2}&bcolor=${color1}&api`)
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //       console.log(result)
    //     },
    //     // Note: it's important to handle errors here
    //     // instead of a catch() block so that we don't swallow
    //     // exceptions from actual bugs in components.
    //     (error) => {
    //       console.log(error)
    //     }
    //   )
    
    return (
      <div className='z-0 w-full h-full flex-1 flex justify-center items-center'>
        {color1 === color2 ? (
          <div className="w-20 h-20 flex justify-center items-center">
            <FontAwesomeIcon
              icon={faCopy}
              className={`${theme === 'dark' ? 'text-darkGray' : 'text-gray'} w-10 h-10 `}
              onClick={() => copyColor(color1)}
            />
          </div>
        ) : (
          <button style={{backgroundColor: color2, borderColor: color2}}
            onClick={() => {
              if (isLocked(color1) && isLocked(color2)) {
                unlockColor(color1)
                unlockColor(color2)
              } else {
                lockColors(color1, color2)
                setSampleBG(color2)
                setSampleFG(color1)
              }
            }}
            className='w-20 h-20 relative flex flex-col justify-between items-start rounded-xl border-2 hover:cursor-pointer'
          >
            {isLocked(color1) && isLocked(color2) && (
              <FontAwesomeIcon
                icon={faStar}
                style={{color: color2, backgroundColor: color1}}
                className='absolute w-10 h-10 opacity-90 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full rotate-[15deg]'
              />
            )}
            <div style={{color: color1}} className='flex flex-1 flex-row w-full pl-2 justify-end items-center gap-2'>
              <p className='font-bold'>
                T:
              </p>

              <div style={{color: color2}}
                className="flex h-full w-1/2 bg-black border-2 rounded-full justify-center items-center"
              >
                <FontAwesomeIcon
                  icon={faCheckDouble}
                  className="text-white  text-xs rounded-full p-1"
                />
              </div> 
            </div>

            <div style={{color: color1}} className='flex flex-1 flex-row w-full pl-2 justify-end items-center gap-2'>
              <p className='italic'>
                t:
              </p>
              
              <div style={{color: color2}}
                className="flex h-full w-1/2 bg-black border-2 rounded-full justify-center items-center"
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-white text-xs rounded-full p-1"
                />
              </div> 
            </div>

            <div style={{color: color1}} className='flex flex-1 flex-row w-full pl-2 justify-end items-center gap-2'>
              <p>
                <FontAwesomeIcon
                  icon={faTriangleCircleSquare}
                />:
              </p>
              
              <div style={{color: color2}}
                className="flex h-full w-1/2 bg-black border-2 rounded-full justify-center items-center"
              >
              <FontAwesomeIcon
                icon={faClose}
                className="text-white  text-xs rounded-full p-1"
              />
              </div> 
            </div>
          </button>
        )}
      </div>
    )
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    console.log('Form Submitted!')
    if (hexColor && hexColor !== "" && hexColor.length === 6) {
      setChosenColors(chosenColors => [...chosenColors, `#${hexColor.toLocaleUpperCase()}`])
      setHexColor("")
    } else {
      setChosenColors((chosenColors) => [...chosenColors, addRandomColor()])
    }
  }

  useEffect(() => {
    console.log('hex color changed')
  }, [hexColor])
  
  useEffect(() => {
    console.log('currently locked colors:')
    console.log(lockedColors)
  }, [lockedColors])

  useEffect(() => {
    setRandomColors()
    setLockedColors([])

    if (theme === 'dark') {
      setSampleBG('#000000');
      setSampleFG("#ffffff");
    } else {
      setSampleFG('#000000');
      setSampleBG("#ffffff");
    }
  }, [])

  return (
    <main className={`${theme === 'dark' ? 'bg-black' : 'bg-white'} transition duration-[1000ms] font-mono absolute w-full h-screen flex flex-col overflow-hidden`}>
        <div className={`${theme === 'dark' ? 'border-white' : 'border-black'} border-b-2 flex flex-row justify-between items-center py-4 px-4 md:px-20 xl:px-40`}>
          <Header1
            title="Chromagram"
          />

          <div className="">
            <Switch checked={theme === 'dark'} onChange={toggleTheme} as={Fragment}>
              {({ checked }) => (
                <button
                  className={`${checked
                    ? 'bg-white'
                    : 'bg-black'
                  } relative inline-flex h-10 w-20 items-center rounded-full duration-700`}
                >
                  <span className="sr-only">Toggle Dark Mode</span>

                  <span
                    className={`${checked
                      ? "translate-x-11 bg-black"
                      : "translate-x-1 bg-black border-2 border-white"
                    } flex items-center p-2 justify-center h-8 w-8 first-letter: transform rounded-full transition duration-500`}
                  >
                    {checked ? (
                      <FontAwesomeIcon
                        icon={faMoon}
                        className='text-white text-xl'
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faSun}
                        className='text-white text-xl'
                      />
                    )}
                  </span>
                </button>
              )}
            </Switch>
          </div>
          
        </div>

        <section className={`${theme === 'dark' ? "border-white" : "border-black"} flex flex-col md:flex-row flex-1 h-1/3 w-full border-b-2`}>
          <form onSubmit={handleSubmit}
            className="flex flex-1 flex-col h-full w-full md:flex-row flex-grow justify-between px-4 md:px-20 xl:px-40"
          >
            <div className="flex flex-col md:flex-row gap-4 h-full justify-center items-center">
              <div className="flex flex-col justify-center items-center gap-4">
                <Header2
                  title='Select a Color'
                  alignment='center'
                />

                <div
                  className={`${theme === 'dark' ? 'border-white' : 'border-black'} h-40 w-40 border-2 rounded-full`}
                />

                <div className="h-full flex flex-1 gap-4 flex-col">
                  <label htmlFor="colorPicker" className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-center`}>Enter Hexadecimal value:</label>
                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faHashtag}
                      className='absolute top-1/2 left-1 text-gray rounded-full h-4 w-4 p-2 transform -translate-y-1/2'
                    />
                    <input
                      type="input"
                      name="colorPicker"
                      value={hexColor}
                      onChange={onHexChange}
                      autoFocus={true}
                      maxLength={6}
                      className={`${theme === 'dark' ? ' text-white border-white focus:outline-white' : 'text-black border-black focus:outline-black'} bg-transparent border-2 py-2 pl-8 rounded-full w-full focus:outline-2 focus:outline`}
                    />
                  </div>
                </div>

                <input type="submit" value="Add Random"
                  className={`${theme === 'dark' ? "bg-white text-black hover:outline-white" : "bg-black text-white hover:outline-black"} uppercase w-full p-4 rounded-full hover:cursor-pointer hover:outline-4 hover:outline focus:outline-4`}
                />
              </div>
            </div>
          </form>

          <section className={`${theme === 'dark' ? 'border-white' : 'border-black'} hidden md:flex flex-grow-0 flex-col relative top-0 right-0 h-full w-1/3 lg:w-1/4 overflow-y-hidden border-l-2`}>
            <div className={`${theme === 'dark' ? 'border-white' : 'border-black'} sticky top-0 px-4 md:pr-20 xl:pr-40 border-b-2`}>
              <Header3
                  title='Instructions:'
                  alignment='end'
                  padding={chosenColors.length > 1}
                />
              </div>

              <div className={`${theme === 'dark' ? 'bg-darkGray' : 'bg-gray'} pb-4 pr-4 h-full overflow-y-scroll md:pr-20 xl:pr-40 transform duration-1000`}>
                <ul className="flex flex-col text-left">
                  {instructions.map((details, i) => (
                    <li key={i}>
                      <Header4
                        title={`${i+1}`}
                      />

                      <p className={`${theme === 'dark' ? 'text-white' : 'text-black'} pl-4`}>
                        {details}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
          </section>
        </section>

        <section className='z-20 flex-1 flex relative h-full flex-row w-screen overflow-scroll'>
          <div className={`${theme === 'dark' ? 'border-white bg-black' : 'border-black bg-white'} z-50 flex sticky left-0 flex-col border-r-2 ${chosenColors.length >= 2 ? 'h-fit' : 'h-full'}`}>
            <div className={`${theme === 'dark' ? 'bg-black border-white' : 'bg-white border-black'} sticky top-0 w-full border-b-2 px-4 md:pl-20 xl:pl-40 transform duration-1000`}>
              <Header3
                title="Manage Colors"
                alignment='start'
                padding={chosenColors.length > 0}
              />
            </div>
            
            <ul className="flex flex-col h-full gap-4 py-4 pr-4 pl-4 md:pl-20 xl:pl-40 items-center">
              {chosenColors.map((color, i) => (
                <li key={`colorBG-${i}`}
                  className={`${theme === 'dark' ? 'border-white' : 'border-black'} flex justify-center md:justify-between flex-row gap-4 p-2 items-center h-20 w-20 md:w-full rounded-full md:border-2`}
                >
                  <button
                    onClick={() => removeColor(color)}
                    disabled={isLocked(color)}
                    className={`${theme === 'dark'
                      ? 'outline-white' && (lockedColors.includes(color) ? 'bg-darkGray text-white' : 'bg-white text-black')
                      : ' text-white outline-black' && (lockedColors.includes(color) ? 'bg-gray text-black' : 'bg-black text-white')
                      }  hidden md:inline p-2 rounded-full h-10 w-10 hover:outline-4 hover:outline`}
                  >
                    <FontAwesomeIcon 
                      icon={isLocked(color) ? faLock : faClose}
                    />
                  </button>

                  <p className={`${theme === 'dark' ? 'text-white' : 'text-black'} hidden md:inline text-xs font-bold`}>
                    {color}
                  </p>
                  
                  <div
                    style={{backgroundColor: color}}
                    className={`${theme === 'dark' ? 'border-white' : 'border-black'} hidden md:flex w-10 h-10 rounded-full border-2`}
                  />

                  <button
                    style={{backgroundColor: color}}
                    className={`${theme === 'dark' ? 'border-white' : 'border-black'} md:hidden w-10 h-10 rounded-full border-2`}
                    onClick={() => removeColor(color)}
                  />
                </li>
              ))}
              <li className="w-full min-w-fit">
                <button
                  onClick={resetColors}
                  className={`${theme === 'dark' ? 'text-black bg-white hover:outline-white' : 'text-white bg-black hover:outline-black'} uppercase whitespace-nowrap w-full p-4 rounded-full hover:cursor-pointer hover:outline-4 hover:outline focus:outline-4`}
                >
                  Randomize
                </button>
              </li>
              <li className="w-full min-w-fit">
                <button
                  onClick={clearColors}
                  className={`${theme === 'dark' ? 'text-black bg-white hover:outline-white' : 'text-white bg-black hover:outline-black'} uppercase whitespace-nowrap w-full p-4 rounded-full hover:cursor-pointer hover:outline-4 hover:outline focus:outline-4`}
                >
                  Clear
                </button>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-1 flex-col w-fit h-full relative">
            <div className="flex flex-1 flex-row">
              <ul className={`${theme === 'dark' ? 'border-white' : 'border-black'} flex flex-row relative w-fit border-r-2 ${chosenColors.length > 4 ? 'h-fit' : 'h-full'} ${lockedColors.length === 0 && 'border-b-2'}`}>
                {chosenColors.map((color1, i) => (
                  <li key={`colorFG-${i}`}
                    className='flex flex-col relative justify-start items-center gap-6'
                  >
                    <button
                        onClick={() => removeColor(color1)}
                        className={`${theme === 'dark' ? 'bg-black border-white' : 'bg-white border-black'} z-10 w-full sticky top-0 border-b-2 py-4 flex justify-center items-center`}
                      >
                        <div style={{backgroundColor: color1}}
                          className={`${theme === 'dark' ? 'border-white' : 'border-black'} w-10 h-10 rounded-full border-2`}
                        >

                        </div>
                    </button>

                    <ul className={`flex flex-col -mt-2 gap-4 px-4 pb-2 ${chosenColors.length > 0 && 'pb-2'}`}>
                      {chosenColors.map((color2, j) => (
                        <li key={`colorSet-${i}-${j}`}>
                          {compareColors(color1, color2)}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>

              <div className={`${theme === 'dark' ? 'border-white' : 'border-black'} ${lockedColors.length === 0 && 'border-b-2'} w-full h-full flex flex-col`}>
                <div className={`${theme === 'dark' ? 'bg-black border-white' : 'bg-white border-black'} border-b-2 px-4 sticky top-0 right-0`}>
                  <Header3
                    title={"Sample"}
                    alignment='start'
                  />
                </div>

                <div style={{background: sampleBG}} className={`flex gap-2 flex-1 flex-col w-full h-full p-4`}>
                  <div className="flex justify-between items-center">
                    <header style={{color: sampleFG}}
                      className="text-3xl uppercase font-bold w-full whitespace-nowrap"
                    >
                      Main Header
                    </header>
                  </div>
                  

                  <div style={{borderColor: sampleFG}} className="w-full border-b-2" />

                  <p style={{color:sampleFG}}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis expedita, et ducimus velit deserunt quo doloribus iusto illo cum laboriosam?
                  </p>

                  <div className="flex justify-between items-center">
                    <header style={{color: sampleFG}}
                      className="text-xl uppercase font-bold w-full whitespace-nowrap"
                    >
                      Sub Header
                    </header>
                  </div>

                  <div className="flex w-full flex-wrap justify-center gap-2">
                    
                    <FontAwesomeIcon
                      icon={faFaceDizzy}
                      style={{color: sampleFG}}
                      className='p-4 rounded-full w-20 h-20'
                    />
                    <FontAwesomeIcon
                      icon={faYinYang}
                      style={{color: sampleFG}}
                      className='p-4 rounded-full w-20 h-20'
                    />
                    <FontAwesomeIcon
                      icon={faTShirt}
                      style={{color: sampleFG}}
                      className='p-4 rounded-full w-20 h-20'
                    />
                    <FontAwesomeIcon
                      icon={faRadiation}
                      style={{color: sampleFG}}
                      className='p-4 rounded-full w-20 h-20'
                    />
                    
                  </div>
                </div>
              </div>
            </div>
            
            {lockedColors.length > 0 && (
              <div className={`${theme === 'dark' ? 'border-white' : 'border-black'} border-t-2 h-full w-full`}>
                <div className={`${theme === 'dark' ? 'border-white' : 'border-black'} px-4 border-b-2 flex flex-row items-center justify-between gap-4 w-full`}>
                  <Header3
                    title='Locked Colors'
                    alignment='start'
                  />

                  <div
                    className={`${theme === 'dark' ? 'border-darkGray' : 'border-gray'} w-full border-b-2`}
                  />

                  <p className={`${theme === 'dark' ? 'text-darkGray' : 'text-gray'} flex-1 whitespace-nowrap font-bold`}>Click a color to copy it's Hex Code</p>
                </div>
                

                <ul className="flex flex-wrap flex-row w-full h-fit gap-4 px-4 py-4 items-center ">
                  {lockedColors.map((color, i) => (
                    <li key={`locked-${i}`}>
                      <button style={{backgroundColor: color}}
                        onClick={() => copyColor(color)}
                        className={`${theme === 'dark' ? 'border-white' : 'border-black'} w-10 h-10 rounded-full border-2`}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
    </main>
  );
}

export default App;
