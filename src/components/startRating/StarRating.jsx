// 0. Import a star icon from the react-icon package, since it's time-consuming to write your own css code.
// - Also because its available, why not take adventage of the module provided by the react-team.
import { useState } from "react";
import { FaRegGrinStars } from "react-icons/fa";
import "./styles.css";
import { SlEnvolopeLetter } from "react-icons/sl";
// Approach:
// - 1. We will return an array of a particular size, which defaults to 10. We can use props to achieve this.
// - 2. Second step is to map each index of the array to a FaRegGrinStart.
// - 3. Each item will recieve a handleClick, handleHover and onMounseEnter functions.
// - 4. The handleHover and handleClick should set the state of hover and selected ICONS respectively. We can use useState hook to achieve this.
// - 5. On mouseEnter is a special function, since it will make the ICON active when the cursor enters, and also the stars before the current icon.
// NOTE : We will use the array's index to set the hover and the current state.
// GOOD LUCK !!!
function StarRating({ numberOfComponents = 8 }) {
  //   a. Defining the states using the useState hook imported from the react library.
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [hoverNumber, setHoverNumber] = useState(0);

  //   Since we are using the first default value of 0 in the both the states, it okay to increase the pointer by 1 in the map function from it is coming.
  function handleOnClick(index) {
    setSelectedNumber(index);
  }
  function handleOnMouseEnter(index) {
    setHoverNumber(index);
  }
  function handleOnMouseLeave() {
    setHoverNumber(selectedNumber);
  }
  return (
    <div className="main">
      <h3>How Happy are you ?</h3>

      {/* 
    -   Task is to return the an array of the icon-component which will have the index as the key for each icon-componene. 
    -   Idea is to rest opertor to create an array. and then use map functionality to return the final component.
    -   Things to be implemented:
        -   onMouseEnter and onMouseLeave. onMouseEnter will set the hover to that index, on leave it will set the hover back to selectedRatings.
        -   onClick to set the ratings.
    */}

      {[...Array(numberOfComponents)].map((element, index) => {
        index += 1;
        return (
          <FaRegGrinStars
            key={index}
            size={50}
            onClick={() => handleOnClick(index)}
            onMouseMove={() => handleOnMouseEnter(index)}
            onMouseLeave={() => handleOnMouseLeave()}
            // Finally and most important of all, we need to set the class to active or inactve depending on the index number compared with the hover state value.
            className={index <= hoverNumber ? "active" : "inactive"}
          />
        );
      })}
      <div className="caption">
        {selectedNumber === 0
          ? "Hope you had an awesome one."
          : selectedNumber < 5
          ? "Be careful, and try not to frown."
          : selectedNumber < 8
          ? "Seems like there is time to make it large."
          : "Oh Great. Have a good night sleep."}
      </div>
    </div>
  );
}

export default StarRating;
