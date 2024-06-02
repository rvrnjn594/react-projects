// There can be two types of accordians, one is single-selection and other is multi-selection
// Other necessary module imports
import { useState } from "react";

// 1. Import the data file and the style file from the the same directory.
import data from "./data.js";
import "./styles.css";

// 0. Default export a funtion which return the JSX code for the accordian component.
function Accordian() {
  // 5. Use useState hook, select the current dataItem
  const [selected, setSelected] = useState(null);

  // This hook will take care of the multipleSelected IDs of the accordians.
  // - Note: this hook initial state is an array, so that more selected id can be pushed and spliced from the array.
  const [multipleSelected, setMultipleSelected] = useState([]);

  // 7. Use useState hook, to store the whether multi-selection is selected or not.
  // - If multi-selection is set to true, then we will use another function(handleMultiSelection) to show the current selected accordians.
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);

  function handleSingleSelection(currentDataItemID) {
    // 6. This is heart of the accordian component for a single click selection.
    // - If the currentSelectedId is same as selected(variable), then set the selected to null. Otherwise, setSelected with the currentId of the selected div.
    // - The accordian that is visible is dependent on the CURRENT STATE OF SELECTED.
    setSelected(currentDataItemID === selected ? null : currentDataItemID);
  }

  // 8. This is second important function, which will show multiple selections in the browser.
  function handleMultipleSelection(currentDataItemId) {
    // But where are we going to store the currently selected accordians, the answer is we need another useState hook (multipleSelected).
    // Since we can not directly update the multipleSelected(as its a bad practice), so we will use the rest operator.
    let copyOfMultipleSelected = [...multipleSelected];
    if (copyOfMultipleSelected.indexOf(currentDataItemId) === -1) {
      copyOfMultipleSelected.push(currentDataItemId);
    } else {
      copyOfMultipleSelected.splice(currentDataItemId, 1);
    }
    // Finally we set the multipleSelected array, but these should be shown on the browser.
    setMultipleSelected(copyOfMultipleSelected);
  }

  return (
    <div className="outer-component">
      {/* Enabling multiple selection button */}
      <button
        className="button"
        onClick={() => setEnableMultiSelection(!enableMultiSelection)}
      >
        Enable Multi-selection
      </button>
      {/* 1. Check if length of data given is greater than 0 or not. */}
      {data && data.length > 1 ? (
        <div className="accordian-component">
          {/* 2. Returning the accordians and the MAIN LOGIC GOES HERE. */}
          {/* 2.a. Mapping the data present as json in the form of an array. (So using the map function is convinient and easy.).....Remember, to use braces, since we are defining a JSX Element. */}
          {data.map((dataItem) => {
            // 3. Mapping each element in the data as an accordian.
            return (
              // 4. Handle the click on each of the accordian component. To do so, take the dataItem's id as an argument to the handleSingleSelection.
              <div
                key={dataItem.id}
                className="accordian"
                // 9. If enableMultipleSelection is true, then we will handle the click differently than only showing a single accordian.
                // - How can we acheive this? Simple, just use a conditional statement
                onClick={
                  enableMultiSelection
                    ? () => handleMultipleSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
              >
                <div className="accordian-question">{dataItem.question}</div>
                <span>+</span>

                {(enableMultiSelection &&
                  multipleSelected.indexOf(dataItem.id) !== -1) ||
                selected === dataItem.id ? (
                  <div className="accordian-answer">{dataItem.answer}</div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-data-present">Please provide the data.</div>
      )}
    </div>
  );
}

export default Accordian;
