/*
    Problem Solution: 
        - We will be using two states, one for the type of color-gernerator('hex' or 'rgb'). Defaults to hex.
        - Other state to store the color itself.
*/

import { useEffect, useState } from "react";

function RandomColorGenerator() {
  const [typeOfColor, setTypeOfColor] = useState("hex");
  const [color, setColor] = useState("#000000");

  // Funtion to create a randomColorUtility. This will create a random number from 0 till length provided in the argument.
  function randomColorUtility(length) {
    return Math.floor(Math.random() * length);
  }
  // This function will handle the generation of hex colors.
  function handleClickHexColor() {
    // Creating an array of hex elements
    const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let hexColor = "#";
    // Buildig the hex string after it is initialized with "#"
    for (let i = 0; i < 6; i++) hexColor += hex[randomColorUtility(hex.length)];
    // Finally setting the color as the newly created color.
    setColor(hexColor);
  }
  //   This function will handle the generation of three constants (red, blue, green).
  //  -------Since we know each constant has to be in a range of 0 till 256(excluded), we can use length === 256 in the randomColorUtility() function.
  function handleClickRGBColor() {
    const red = randomColorUtility(256);
    const blue = randomColorUtility(256);
    const green = randomColorUtility(256);
    // rgb color is represented as rgb233233233
    setColor(`rgb(${red},${blue},${green})`);
  }

  //   This useEffect hook is very helpful, since when we are changing the typeOfColor, which should change the complete display. It means, whenever the typeOfColor changes(which is a dependent of the hook),
  //   the useEffect hook will be automatically called.
  useEffect(() => {
    if (typeOfColor === "rgb") handleClickRGBColor();
    else handleClickHexColor();
  }, [typeOfColor]);

  //   Writing inline styling. (Setting the background color as the state color.)
  return (
    <div style={{ width: "100vw", height: "100vh", background: color }}>
      <button onClick={() => setTypeOfColor("hex")}>Create HEX Color</button>
      <button onClick={() => setTypeOfColor("rgb")}>Create RGB Color</button>
      <button
        onClick={
          typeOfColor === "hex"
            ? () => handleClickHexColor()
            : () => handleClickRGBColor()
        }
      >
        Generate Any Random Color
      </button>

      {/* These lines will help display the typeOfColor. */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "60px",
          marginTop: "50px",
        }}
      >
        <h1>{typeOfColor === "hex" ? "HEX COLOR " : "RGB COLOR"}</h1>
        <h3>{color}</h3>
      </div>
    </div>
  );
}

export default RandomColorGenerator;
