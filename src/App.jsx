import { useState } from "react";

// 0. Import the component
import Accordian from "./components/accordian/Accordian";
import RandomColorGenerator from "./components/randomColorGenerator/RandomColorGenerator";
import StarRating from "./components/startRating/StarRating";

function App() {
  return (
    <>
      {/* Remember to un-comment the import statement as well, using a particular component. */}

      {/* 1. Step-by-step to show how to create a singleSelection and multipleSelection Accordians. */}
      <Accordian />

      {/* 2. Create a random hex-code and rgb generator background. */}
      <RandomColorGenerator />

      {/* 3. Create a star-rating. */}
      <StarRating />
    </>
  );
}

export default App;
