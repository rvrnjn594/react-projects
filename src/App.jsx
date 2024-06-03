import { useState } from "react";

// 0. Import the component
import Accordian from "./components/accordian/Accordian";
import RandomColorGenerator from "./components/randomColorGenerator/RandomColorGenerator";
import StarRating from "./components/startRating/StarRating";
import ImageSlider from "./components/imageSlider/ImageSlider";

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

      {/* 4. Create a image-slider, where the images are loaded from a url. (Pass an URL property for the user to provide the images.)*/}
      <ImageSlider url="https://picsum.photos/v2/list" />
    </>
  );
}

export default App;
