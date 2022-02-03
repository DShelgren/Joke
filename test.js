async function fetchJokes() {
    var response = await fetch('https://raw.githubusercontent.com/DShelgren/Joke/master/datasets/stupidstuff.json');
    array = await response.json();
    return array;
}

    async function ShowSorted(){
        var Jokes = await fetchJokes();
        console.log(Jokes);
        removeBlanks(Jokes);
        shuffleFY(Jokes);
        let key="category";
        sortByKey(Jokes,key);
        console.log(Jokes);
        var x = Math.floor(Math.random()*Jokes.length); //create random index
      console.log(findOcc(Jokes, key));
      console.log(`${x}random value made?`);
      var testObject = Jokes[x].body;//test variable of body/joke
      console.log(testObject);//output selected random joke
    }
    
    ShowSorted();

     /* console.table(Jokes); // You can index every object
      var x = Math.floor(Math.random()*Jokes.length); //create random index
      console.log(`${x}random value made?`)
      var testObject = Jokes[x].body;//test variable of body/joke
      console.log(testObject);//output selected random joke
      removeBlanks(Jokes); //removes blank bodies
      shuffleFY(Jokes); //call shuffling array
      console.log(Jokes); //display shuffled array
      let key ="category"; //Set key to category
      SortArrayKey(Jokes, key); //calling sort function using key
      
      console.log(findOcc(data,key));//call find occurance function
      */
      
    


  function findOcc(arr, key){ //function to return array of unique keys within object & counts of keys
    let arr2 = []; //new array to hold elements
      
    arr.forEach((x)=>{
         
      // Checking if there is any object in arr2
      // which contains the key value
       if(arr2.some((val)=>{ return val[key] == x[key] })){
           
         // If yes! then increase the occurrence by 1
         arr2.forEach((k)=>{
           if(k[key] === x[key]){ 
             k["occurrence"]++
           }
        })
           
       }else{
         // If not! Then create a new object initialize 
         // it with the present iteration key's value and 
         // set the occurrence to 1
         let a = {}
         a[key] = x[key]
         a["occurrence"] = 1
         arr2.push(a);
       }
    })
      
    return arr2
  }

  function shuffleFY(array) { //Fisher Yates randomizer
    let i = array.length; //set length as iterator
    while (i--) { //while loop
      const ri = Math.floor(Math.random() * i); //random selection of index
      [array[i], array[ri]] = [array[ri], array[i]];//swap items by linear index vs random
    }
    return array; //return modified array
  }

  function removeBlanks(array){ //function to remove blank bodies, can happen with auto-gather tools in JSON
    let i=array.length;
    while (i--) //while loop descending
    {
      if(!array[i].body) //check the inverse of joke body exists
      {
        var lostJokes=array.splice(i,1); //then splice original array, sending blanks to lostJokes
      }

}  }

function SortArrayKey(array, key)
{ //sort function by key, category etc.
    array.sort((a,b) => {//calling sort with inline function
    let fa=a.key,
    fb=b.key;//set a/b categories as subcategories of object
if(fa<fb)   { //standard less than, swap index
    return -1;
            }
if (fa>fb)  { //standard more than, swap index
    return 1;
            }
return 0; //else clause of leave it in place Since array is sent as pointer, no return of array is needed.
                        })
}

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

    


 
