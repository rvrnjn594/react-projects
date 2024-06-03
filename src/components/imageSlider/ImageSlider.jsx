// All necessary imports
import { useState, useEffect } from "react";
import "./styles.css";

// Importing the arrows from the react-icons
import { BsDisplay, BsFillArrowLeftCircleFill } from "react-icons/bs";
import { ImArrowRight } from "react-icons/im";
import { BiCurrentLocation } from "react-icons/bi";

/*
- Problem Statement: 
    - We have to build a ImageSlider, where the url for each comes from a dummy API.

- Approach:
    - The API will be fetched asynchronously from the API, also we can use useFetch hook, url as a dependency.
    - After we get the data as an array of objects. We will manipulate the array to build an image element for each obkect and return it.
    - Also, we will use two more states for features as error and loading.
    - Implement two arrows, namely left and right arrow(react-icons is a good place), which onClick properties.
    - Below the onClick we can also show dots, which will slide the picture directly to that index in the data list.
*/

function ImageSlider({ url, limit = 5 }) {
  // 0. Defining states here.
  const [listOfImages, setListOfImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(null);

  //   This state is important as it has the information of the current picture in the view.
  const [currentImage, setCurrentImage] = useState(0);
  // Another state to hold the current page number, that will help us implement the pagination feature.
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [URL, setURL] = useState(url);

  // 1. First, get the data from the url povided as a prop. Acheive this in a try-catch block.
  // ------------ We can use async await or a then clause. -----------------
  //   1.a. Define a function to fetch all the objects from the url provided.

  async function fetchImagesFromURL(getUrl) {
    // We will use a try-catch block to setListOfImages.
    try {
      // Idea: We set the loading to true, till the api fetch request has not sent a response.
      setLoading(true);

      //   Let's set the listOfImages according to the data received from the API.
      const response = await fetch(getUrl); //Using a template literal to create the url string.
      const data = await response.json();

      if (data) {
        setListOfImages(data);
        //   We set the loading back to false at the end of the complete success of the fetch request.
        setLoading(false);
      }
    } catch (error) {
      //   In case an error exists, then we set the error accordingly.
      setErrorMessage(error.message);
      //   also, loading is set back to false.
      setLoading(false);
    }
  }
  // 1.b. Time to call the above function to fetch the url, it's advisable to use an useEffect hook, since the url is not changing.
  useEffect(() => {
    if (url !== "") {
      const newURL = `${url}?page=${currentPageNumber}&$limit=${limit}`;
      fetchImagesFromURL(newURL);
    }
  }, [URL, currentPageNumber]);
  console.log(listOfImages);
  //   NOTE:  Important step - it's important to use the useEffect hook, url as a dependent argument. Otherwise, the data will keep on being fetched infinitely.

  /*
- If loading is set to true, then we return a loading component.
- If errorMessage is not null, then we return the error component, or the error message.
*/

  // Defining functions for the left and right arrow clicks.
  function handleLeftClick() {
    setCurrentImage(
      currentImage === 0 ? listOfImages.length - 1 : currentImage - 1
    );
  }
  function handleRightClick() {
    setCurrentImage(
      currentImage === listOfImages.length ? 0 : currentImage + 1
    );
  }

  //   Function declaration to handle the pagination feature. To show pagination, we will simply change the page number and the useEffect hook will fetch the API again.
  // To set the page number, we will need another useState hook.
  function handlePagination(pageNumber) {
    console.log(pageNumber);
    console.log(URL);
    setCurrentPageNumber(pageNumber);
  }

  //   2. Finally, we will return two features - a. Implementing the image-slider itself. b. Implementing the pagination feature as well.
  return (
    <div className="outer-container">
      {loading && <p className="loading">LOADING</p>}
      {errorMessage && (
        <div>
          <span>There is an error : </span>
          <p className="errorMessage">{errorMessage}</p>
        </div>
      )}
      {!loading && errorMessage === null && (
        // All our logic to implement the image slider will go here.
        <>
          <div className="image-slider">
            <BsFillArrowLeftCircleFill
              className="arrow arrow-left"
              onClick={() => handleLeftClick()}
            />

            {/* Looping over the set of objects to get the image url and set the attribute of image tags for each image. */}
            {listOfImages &&
              listOfImages.length >= 1 &&
              listOfImages.map((object, index) => {
                return (
                  <div key={object.id} className="image-container">
                    <img
                      src={object.download_url}
                      alt={object.author}
                      className={
                        currentImage === index
                          ? "currentImage"
                          : "currentImage hideImage"
                      }
                    />
                    <p
                      className={
                        currentImage === index
                          ? "currentImage"
                          : "currentImage hideImage"
                      }
                    >
                      Author: {object.author}
                    </p>
                  </div>
                );
              })}

            <ImArrowRight
              className="arrow arrow-right"
              onClick={() => handleRightClick()}
            />
          </div>

          {/* Pagination code goes here */}
          <div className="pagination">
            {[...Array(10)].map((_, index) => {
              index += 1;
              return (
                <button key={index} onClick={() => handlePagination(index)}>
                  {index}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default ImageSlider;
