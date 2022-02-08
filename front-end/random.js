// grabs the button to be used. - button already added to html
const randomButton = document.getElementById("random-btn");
const categoryTitle = document.querySelector("#category-title");
const JokeText = document.getElementById("jokeText");

// joke Arrays
let jokesArray = []; // stores the jokes - depending on the category selected
let previousJokes = []; // stores the previous jokes

// fetches the data from the json
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
// FILLING THE JOKE ARRAY TO BE USED FOR THE FIRST TIME
getData().then((data) => {
  for (let i = 0; i < data.length; i++) {
    jokesArray.push(data[i].body);
  }
});
// SETS THE JOKE ARRAY BACK TO RANDOM IF ANOTHER CATEGORY WAS PREVIOUSLY SELECTED
function setRandomJokes() {
  getData().then((data) => {
    categoryTitle.innerText = "Random Joke";
    for (let i = 0; i < data.length; i++) {
      jokesArray.push(data[i].body);
    }
  });
  newJoke(); // displays a joke when the random button is pressed
}

// DISPLAYS A NEW JOKE IN THE TEXT BOX
function newJoke() {
  let jokeNum = Math.floor(Math.random() * jokesArray.length); // gets random integer
  if (jokesArray[jokeNum].length > 0) {
    JokeText.innerText = jokesArray[jokeNum]; // changes the text of the joke-area based on array index of the random int
    previousJokes.unshift(jokeNum); // stores the previous joke index- unshift to store at the front for easy access later
  } else {
    newJoke(); // filters out blank jokes that may be in the dataset - will not display a blank joke text box
  }
}
randomButton.addEventListener("click", setRandomJokes);
