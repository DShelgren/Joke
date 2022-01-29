// fetch inside function to be used later. we need to return a new Promise.
function getData() {
  return new Promise((resolve, reject) => {
    // returning a new Promise that we can use later outside the fetch
    fetch("./stupidstuff.json") // grabs the file
      .then((response) => response.json()) // gets response in json format
      .then((fetchedData) => {
        let data = fetchedData;
        resolve(data); // what we are resolving with the promise
      });
  });
}
const categoryTitle = document.querySelector("#category-title");
// using the promise to fill our category array
let categoryArray = [];
getData().then((data) => {
  // calling the function with a .then
  for (let i = 0; i < data.length; i++) {
    // looping through the data
    categoryArray.push(data[i].category); // adding the category attribute from each object to our array
  }
  categoryArray.sort(); // sorting the array
  categoryArray = [...new Set(categoryArray)]; // getting rid of duplicates by making our array a Set.

  const navBar = document.getElementById("navBar");
  for (let i = 0; i < categoryArray.length; i++) {
    // create new elements
    const newCategoryEl = document.createElement("li"); // new list item
    newCategoryEl.className = "category"; // adding classnames
    const newCategoryButtonEl = document.createElement("button"); // new button
    newCategoryButtonEl.className = "category-button"; // adding classnames
    const buttonText = document.createTextNode(categoryArray[i]); // adding text to the button
    // connect new elements
    newCategoryButtonEl.appendChild(buttonText); // connecting button text to the button
    newCategoryEl.appendChild(newCategoryButtonEl); // connecting the button to the new list item
    // connect to existing elements
    navBar.appendChild(newCategoryEl); // connecting the new list item to the existing list
    newCategoryButtonEl.addEventListener("click", () => {
      categoryTitle.innerText = categoryArray[i];
    });
  }
});

// gets the jokes from json and puts in an array
let jokesArray = [];
getData().then((data) => {
  for (let i = 0; i < data.length; i++) {
    jokesArray.push(data[i].body);
  }
});

// functionality for next button
const nextButton = document.getElementById("next-btn");

// will update the joke text area with a new random joke when you press next
const JokeText = document.getElementById("jokeText");
let previousJokes = []; // creates an array that will store the previous jokes
function newJoke() {
  let jokeNum = Math.floor(Math.random() * jokesArray.length); // gets random integer
  if (jokesArray[jokeNum].length > 0) {
    JokeText.innerText = jokesArray[jokeNum]; // changes the text of the joke-area based on array index of the random int
    previousJokes.unshift(jokeNum); // stores the previous joke index- unshift to store at the front for easy access later
  } else {
    newJoke();
  }
}
nextButton.addEventListener("click", newJoke);

// functionality for previous button
const prevButton = document.getElementById("prev-btn");
function prevJoke() {
  if (previousJokes.length > 0) {
    // makes sure you do not get undefined if no prevous jokes available
    JokeText.innerText = jokesArray[previousJokes[0]]; // sets the joke area text to the previous joke
    previousJokes.shift(); // removes the current joke from the previous list
  } else {
    return;
  }
}
prevButton.addEventListener("click", prevJoke);
