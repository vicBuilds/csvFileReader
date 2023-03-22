let submitButton = document.getElementById("search");

const handleSearch = (e) => {
  e.preventDefault();

  let inputValue = document.getElementById("search-input").value;
  let selectedOption = document.getElementById("fields");
  let text = selectedOption.options[selectedOption.selectedIndex].text;
  let index = selectedOption.options.selectedIndex;
  // console.log(inputValue.toUpperCase());

  //document.getElementById("search-input").value = "";

  inputValue = inputValue.toUpperCase();
  let txtValue;

  //console.log("The Values are", inputValue, "Text is ", text);

  let table = document.getElementById("main-table");

  let rows = table.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    let td = rows[i].getElementsByTagName("td")[index];
    //console.log(td);
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(inputValue) > -1) {
        rows[i].style.display = "";
      } else {
        console.log("Working on this");
        rows[i].style.display = "none";
      }
    }
  }
};

// submitButton.addEventListener("click", (e) => {
//   console.log("Hello.. This is Me....");

// });

let inputBox = document.getElementById("search-input");
// console.log(inputBox);

let dropdown = document.getElementById("fields");
dropdown.addEventListener("change", (e) => {
  handleSearch(e);
});

inputBox.addEventListener("keyup", (e) => {
  //console.log("123456");
  handleSearch(e);
});
