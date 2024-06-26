import { useEffect, useRef, useState } from "react";
import { getBubbleSortAnimation } from '../Algorithms/BubbleSort';
import { getSelectionSortAnimation } from '../Algorithms/SelectionSort'
import { getQuickSortAnimation } from '../Algorithms/QuickSort'
import { getInsertionSortAnimations } from '../Algorithms/InsertionSort'
import { getHeapSortAnimations } from '../Algorithms/HeapSort'

const SortingVisualizer = () => {
    const [arraySize, setArraySize] = useState(40);
    const [animationSpeed, setAnimationSpeed] = useState(60);
    const [sortingArray, setSortingArray] = useState([]);
    const [disableButtons, setDisableButtons] = useState(false);
    const [setsortingAlgoInd, setSortingAlgoInd] = useState(0);
    const ref = useRef(null);

    const duplicateArray = sortingArray.slice();
    const sortingAlogoritms = ["Select The Sorting Algorithm👆","Bubble Sort", "Quick Sort", "Selection Sort", "Heap Sort", "Insertion Sort"]

    useEffect(() => {
      const newArray = [];
      for (let i = 0; i < arraySize; i++) {
        newArray.push(generateRandomElement(40, 400))
        
      }
      setSortingArray(newArray);
    }, [arraySize])

    // const barWidth = arraySize > 50 ? 12 : arraySize > 25 ? 5 : 24;    

    const generateRandomElement = (max, min) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const resetArray = () => {
        setSortingAlgoInd(0)
        const newArray = [];
        for (let i = 0; i < arraySize; i++) {
            newArray.push(generateRandomElement(40, 400));
        }
        setSortingArray(newArray);
    };


    const sortingAnimation = (animationArray) => {
        setDisableButtons(true);
        const arrayBars = document.getElementsByClassName('arrayBar');
        for (let i = 0; i < animationArray.length; i++) {
            const isChangeColor = (i % 3 !== 1); 

            if(isChangeColor === true) {
                const [barOneInd, barTwoInd] = animationArray[i];
                const barOneStyle = arrayBars[barOneInd].style;
                const barTwoStyle = arrayBars[barTwoInd].style;
                const color = i % 3 === 0 ? "turquoise" : "#a66cff";

                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * (101 - animationSpeed));
            }
            else {
                setTimeout(() => {
                    const [barOneInd, barOneNewHeight, barTwoInd, barTwoNewHeight] = animationArray[i];
                    const barOneStyle = arrayBars[barOneInd].style;
                    const barTwoStyle = arrayBars[barTwoInd].style;

                    barOneStyle.height = `${barOneNewHeight}px`;
                    barTwoStyle.height = `${barTwoNewHeight}px`;
                }, i * (101 - animationSpeed));
            }
        }
        setTimeout(() => {
            setDisableButtons(false);
          }, animationArray.length * (101 - animationSpeed));
        
    }

    const bubbleSort = () => {
        setSortingAlgoInd(1)
        window.scrollTo(0, 200) 
        ref.current?.scrollIntoView({ behavior: "smooth" });
        const animationArray = getBubbleSortAnimation(duplicateArray, arraySize);
        sortingAnimation(animationArray);   
    } 

    const quickSort = () => {
        setSortingAlgoInd(2)
        ref.current?.scrollIntoView({ behavior: "smooth" });
        const animationArray = getQuickSortAnimation(duplicateArray, arraySize);        
        sortingAnimation(animationArray);    
    }
    const selectionSort = () => {
        setSortingAlgoInd(3)
        ref.current?.scrollIntoView({ behavior: "smooth" });
        const animationArray = getSelectionSortAnimation(duplicateArray, arraySize);
        sortingAnimation(animationArray);    
    }
    const heapSort = () => {
        setSortingAlgoInd(4)
        ref.current?.scrollIntoView({ behavior: "smooth" });
        const animationArray = getHeapSortAnimations(duplicateArray, arraySize);
        sortingAnimation(animationArray);    
    }
    const InsertionSort = () => {
        setSortingAlgoInd(5)
        setDisableButtons(true);
        // ref.current?.scrollIntoView({ behavior: "smooth" });
        const animations = getInsertionSortAnimations(duplicateArray, arraySize);
        const arrayBars = document.getElementsByClassName("arrayBar");
        for (let i = 0; i < animations.length; i++) {
        const isColorChange = i % 3 !== 1;
        if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? "turquoise" : "#a66cff";
            setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
            }, i * (101 - animationSpeed));
        } else {
            setTimeout(() => {
            const [barIdx, newHeight] = animations[i];
            const barStyle = arrayBars[barIdx].style;
            barStyle.height = `${newHeight}px`;
            }, i * (101 - animationSpeed));
        }
        }
        setTimeout(() => {
            setDisableButtons(false);
        }, animations.length * (101 - animationSpeed));  
    }

    const getArrayBarWidth = () => {
        if (ref.current) {
          const containerWidth = ref.current.clientWidth;
          const barWidth = Math.max(3, Math.floor(containerWidth / arraySize) - 2);
          return barWidth;
        }
        return 10;
      };

    return (
        <div className="sorting">
    
            <div className="main-heading">Sorting Visualizer</div>
            <div className="navbar">
                <div className="range-container">
                    <div className="size">
                        <label htmlFor="size-slider">Size of Array</label>
                        <input 
                            type="range" 
                            className="slider"
                            id="size-slider" 
                            value={arraySize} 
                            min={10} 
                            max={80} 
                            onChange={(e) => { setArraySize(e.target.value) }} 
                            disabled={disableButtons}   
                        />
                    </div>
                    <div className="speed">
                    <label htmlFor="speed-slider">Sorting Speed</label>
                        <input 
                            type="range"                               
                            className="slider"
                            id="speed-slider" 
                            value={animationSpeed} 
                            min={1} 
                            max={100} 
                            onChange={(e) => { setAnimationSpeed(e.target.value) }} 
                            disabled = {disableButtons}   
                        />
                    </div>
                </div>
                <div className="buttons">
                    <button className="generate" onClick={resetArray} disabled={disableButtons} >Generate New Array</button>

                    <button disabled={disableButtons} onClick={ bubbleSort }>Bubble Sort</button>
                    <button disabled={disableButtons} onClick={ quickSort }>Quick Sort</button>
                    <button disabled={disableButtons} onClick={ selectionSort }>Selection Sort</button>
                    <button disabled={disableButtons} onClick={ heapSort }>Heap Sort</button>
                    <button disabled={disableButtons} onClick={ InsertionSort }>Insertion Sort</button>
                </div>
            </div>


            <div className="main">
                <h1 className="heading">{sortingAlogoritms[setsortingAlgoInd]}</h1>
                <div className="sorting-container" ref={ref}>
                    {
                        sortingArray.map((element, ind) => {
                            return (
                                <div 
                                    className="arrayBar"
                                    key={ind}
                                    style={{
                                        height: `${element}px`,
                                        width: `${getArrayBarWidth()}px`,
                                    }}
                                >
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </div>
        
    );
}

export default SortingVisualizer;