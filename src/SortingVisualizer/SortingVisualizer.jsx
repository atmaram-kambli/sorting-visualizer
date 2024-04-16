import { useEffect, useState } from "react";
import { getBubbleSortAnimation } from '../Algorithms/BubbleSort'


const SortingVisualizer = () => {
    const [arraySize, setArraySize] = useState(20);
    const [animationSpeed, setAnimationSpeed] = useState(60);
    const [sortingArray, setSortingArray] = useState([]);

    useEffect(() => {
      const newArray = [];
      for (let i = 0; i < arraySize; i++) {
        newArray.push(generateRandomElement(10, 300))
        
      }
      setSortingArray(newArray);
    }, [arraySize])
    

    const generateRandomElement = (max, min) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }


    const sortingAnimation = (animationArray) => {
        const arrayBars = document.getElementsByClassName('arrayBar');
        for (let i = 0; i < animationArray.length; i++) {
            // The color of elements will change if ther are swaping their places;
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
    }

    const bubbleSort = () => {
        // const animationArray = getBubbleSortAnimation(sortingArray, arraySize)
        const animationArray = getBubbleSortAnimation(sortingArray, arraySize);
        sortingAnimation(animationArray);    
    }

    return (
        <div className="sorting">
    
            <div className="navbar">
                <div className="range-container">
                    <div className="size">
                        <label htmlFor="size-slider">Size of Array</label>
                        <input 
                            type="range" 
                            name="size-slider" 
                            id="size-slider" 
                            value={arraySize} 
                            maxLength={100} 
                            minLength={10} 
                            onChange={(e) => { setArraySize(e.target.value) }}    
                        />
                    </div>
                    <div className="speed">
                    <label htmlFor="speed-slider">Size of Array</label>
                        <input 
                            type="range" 
                            name="speed-slider" 
                            id="speed-slider" 
                            value={animationSpeed} 
                            maxLength={100} 
                            minLength={10} 
                            onChange={(e) => { setAnimationSpeed(e.target.value) }}    
                        />
                    </div>
                </div>
                <div className="buttons">
                    <button >Generate New Array</button>

                    <button>Quick Sort</button>
                    <button onClick={ bubbleSort }>Bubble Sort</button>
                    <button>Selection Sort</button>
                    <button>Heap Sort</button>
                    <button>Insertion Sort</button>
                </div>
            </div>


            <div className="main">
                {
                    sortingArray.map((element, ind) => {
                        return (
                            <div 
                                className="arrayBar"
                                key={ind}
                                style={{
                                    height: `${element}px`,
                                    width: `20px`,
                                }}
                            >
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default SortingVisualizer;