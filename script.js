function addRow() {
  const tableBody = document.getElementById("table-body");
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td><input type="text" onkeydown="moveCursor(event, ${tableBody.childElementCount}, 0)" /></td>
    <td><input type="text" onkeydown="moveCursor(event, ${tableBody.childElementCount}, 1)" /></td>
    <td><input type="text" onkeydown="moveCursor(event, ${tableBody.childElementCount}, 2)" /></td>
    <td><input type="text" onkeydown="moveCursor(event, ${tableBody.childElementCount}, 3)" /></td>
    <td><input type="text" onkeydown="moveCursor(event, ${tableBody.childElementCount}, 4)" /></td>
    <td><input type="text" onkeydown="moveCursor(event, ${tableBody.childElementCount}, 5)" /></td>
    <td><input type="text" onkeydown="moveCursor(event, ${tableBody.childElementCount}, 6)" /></td>
    <td><button onclick="saveRowData(this)">Save</button></td>
    <td><button onclick="enableRowEditing(this)">Edit</button></td>
  `;

  tableBody.appendChild(newRow);

  // Enable input fields in the new row initially
  const inputs = newRow.querySelectorAll("input");
  inputs.forEach((input) => {
    input.removeAttribute("disabled");
  });
}

function removeLastRow() {
  const tableBody = document.getElementById("table-body");
  const rows = tableBody.getElementsByTagName("tr");
  if (rows.length > 1) {
    tableBody.removeChild(rows[rows.length - 1]);
  } else {
    alert("Minimum one row is required");
  }
}

function saveRowData(button) {
  const row = button.parentElement.parentElement;
  const inputs = row.querySelectorAll("input");
  inputs.forEach((input) => {
    input.setAttribute("disabled", true); // Disable the input field
  });
  row.classList.remove("editing");
  row.classList.add("saved");
}

function moveCursor(event, rowIndex, cellIndex) {
  const tableBody = document.getElementById("table-body");
  const rows = tableBody.getElementsByTagName("tr");
  const currentInput = event.target;
  const currentRow = rows[rowIndex];
  const allInputs = currentRow.querySelectorAll("input");
  const totalInputs = allInputs.length;

  // Function to move the cursor to the previous input cell
  function moveToPreviousCell(index) {
    if (index >= 0) {
      const prevInput = allInputs[index];
      prevInput.focus();
    }
  }

  // Function to check if the input cell is empty or not
  function isEmptyInput(input) {
    return input.value.trim() === "";
  }

  // If the backspace key is pressed
  if (event.key === "Backspace" && isEmptyInput(currentInput)) {
    const currentIndex = Array.from(allInputs).indexOf(currentInput);

    if (currentIndex === 0) {
      // If the current input is the first one, move to the last input of the previous row
      const prevRow = rows[rowIndex - 1];
      if (prevRow) {
        const prevRowInputs = prevRow.querySelectorAll("input");
        moveToPreviousCell(prevRowInputs.length - 1);
      }
    } else {
      // Move to the previous input in the same row
      moveToPreviousCell(currentIndex - 1);
    }
  } else if (event.key === "Enter") {
    const nextIndex = (cellIndex + 1) % totalInputs;
    const nextRow = rows[rowIndex + 1];

    if (nextIndex === 0 && nextRow) {
      // Move to the first input of the next row
      const nextRowInputs = nextRow.querySelectorAll("input");
      nextRowInputs[0].focus();
    } else {
      // Move to the next input in the same row
      const nextInput = allInputs[nextIndex];
      nextInput.focus();
    }
  }
}

function enableRowEditing(button) {
  const row = button.parentElement.parentElement;
  const inputs = row.querySelectorAll("input");
  inputs.forEach((input) => {
    input.removeAttribute("disabled");
  });
  row.classList.add("editing");
  row.classList.remove("saved");
}
