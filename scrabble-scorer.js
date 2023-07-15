// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

// Is deprecated and will be transformed to a new structure called newPointStructure below
const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z'],
  0: [' ']
};

// Is deprecated and will be replaced by the function scrabbleScorer below.
function oldScrabbleScorer(word) {

	word = word.toUpperCase();

	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// Transform oldPointStructure to newPointStructure and return newPointStructure. Each key in newPointStructure is now a letter in the alphabet and the value is the points for that letter.
function transform(oldPointStructure) {

   let newPointStructure = {};

   for (key in oldPointStructure) {

      for (let i = 0; i < oldPointStructure[key].length; i++) {

         newPointStructure[oldPointStructure[key][i]] = Number(key);

      }
   }

   return newPointStructure;

}

// Assign newPointStructure to newPointStructure after calling the transform function with the oldPointStructure as a parameter.
let newPointStructure = transform(oldPointStructure);

// Replaces oldScrabbleScorer and uses the newPointStructure to score the word.
function scrabbleScorer(word) {

   // Make letters upper case to check with case insensitivity.
	word = word.toUpperCase();

   // letterPoints is a string that will hold the letter points for each letter in the word.
	let letterPoints = "\n"; 

   // points is a number that will hold the total points for the word.
   let points = 0;
   
   // Loop through each letter in the word.
   for (let i = 0; i < word.length; i++) {
   
      // Check if the letter matches the corresponding newPointStructure key. If it does, add the points to the total points. And then add the letter points. Spaces are 0 pts as defined in the transformation from oldPointStructure to newPointStructure.
      for (key in newPointStructure) {
         
         if (word[i] === key) {

            points += newPointStructure[key];
            letterPoints += `Points for '${word[i]}': ${newPointStructure[key]}\n`;

         }
      

      }
   }
	
   // Return the letter points with the total points at the end.
   letterPoints += `\nTotal Points: ${points}\n`;
	return letterPoints;

 }

 

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

// Prompt the user for a word to score. Validate input using regular expressions. Return the user's word.
function initialPrompt() {

   console.log("\nLet's play some scrabble!");

   let word = input.question("\nEnter a word to score: ");

   // RegEx - Letters only, and can be multiple letters. Includes a space.
   let letters = /^[A-Za-z ]+$/; 

   while (!word.match(letters)) {

      word = input.question("\nEnter a word to score: ");

   }
   return word;
}

// Each letter in the word is worth 1 point.
function simpleScorer(word) {
   
   // Make letters upper case to check with case insensitivity.
   word = word.toUpperCase();

   // letterPoints will hold the total points for the word.
   let letterPoints = 0;

   for (let i = 0; i < word.length; i++) {
      
      // If the character is a space, add 0 points to the total points. Otherwise, add 1 point.
      if (word[i] === ' '){

         letterPoints += 0;

      } else {

      letterPoints += 1;

      }
   }

   return letterPoints;
}

// Each vowel in the word is worth 3 points. Each consonant is worth 1 point.
function vowelBonusScorer(word) {

   // Make letters upper case to check with case insensitivity.
   word = word.toUpperCase();

   // letterPoints will hold the total points for the word.
   let letterPoints = 0;

   // used to check for vowels.
   let vowelsRegEx = /^[AEIOU]$/;

   for (let i = 0; i < word.length; i++) {

      // Check for vowels (using regular expression) and consonants. Vowels are 3 pts, Consonants are 1 pt.
      if (word[i].match(vowelsRegEx)) {   

         letterPoints += 3;
        // If the character is a space, add 0 points to the total points. Otherwise, add  1 point.
      } else if (word[i] === ' ') {

         letterPoints += 0;

      } else {

         letterPoints += 1;
      }
   }
   return letterPoints;
}

// Objects representing their corresponding scoring functions.

// For simple scoring, each letter is worth 1 point. scoringFunction is a function that takes a word and returns the total points for the word after calling simpleScorer with the word as a parameter.
let simpleScore = {

   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scoringFunction: function(word) { return(simpleScorer(word)); }


};

// For bonus scoring, each vowel is worth 3 points. Consonants are 1 pt. scoringFunction is a function that takes a word and returns the total points for the word after calling vowelBonusScorer with the word as a parameter.
let bonusVowels = {

   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scoringFunction: function(word) { return(vowelBonusScorer(word)); }

};

// For Scrabble scoring, each letter is worth points based on the Scrabble Scoring rules. scoringFunction is a function that takes a word and returns the total points for the word after calling scrabbleScorer with the word as a parameter.
let scrabble = {

   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scoringFunction: function(word) { return(scrabbleScorer(word)); }

};

// An array of the objects representing each scoring algorithm. Will be used in runProgram.
const scoringAlgorithms = [simpleScore, bonusVowels, scrabble];

// Prompt the user for a number from 0-2. 0 = Simple Score, 1 = Vowels Bonus, and 2 = Scrabble. Return the user's number.
function scorerPrompt() {

   // Get the user's number.
   let scoringSelection = input.question(`\n\nWhich scoring algorithm would you like to use? \n\nSimple Score = 0 (One point per character)\nVowels Bonus = 1 (Vowels = 3 pts, Consonants = 1 pt)\nScrabble = 2 (Uses Scrabble Point System)\n\nEnter a number from 0-2: `);

   // Make sure the user's number is a number between 0 and 2 using the regular expression. If it is not, keep prompting the user.
   let regex = /^[0-2]$/; 
   
   while (!scoringSelection.match(regex)) {

      scoringSelection = input.question(`\n\nWhich scoring algorithm would you like to use? \n\nSimple Score = 0 (One point per character)\nBonus Vowels = 1 (Vowels = 3 pts, Consonants = 1 pt)\nScrabble = 2 (Uses Scrabble Point System)\n\nEnter a number from 0-2: `);

   }
   // Return the user's number.
   return Number(scoringSelection);
} 

// Main function to run the program.
function runProgram() {

  // Get the user's word.
  let newWord = initialPrompt();

  // Get the user's scoring algorithm.
  let scoringAlgorithmSelection = scorerPrompt();

  // If the user's scoring algorithm is 2 (Scrabble), then we need to slightly change the results output to the user to provide a \n after the part - "score for '${newWord}':". Else, we'll just print the score right after the part - "score for '${newWord}'.". 

  // In the output, we call the corresponding scoring function in the scoringAlgorithms array with the word as a parameter (based on the users scoring algorithm they selected) using bracket notation.
  if (scoringAlgorithmSelection === 2) {
  
   console.log(`\nScoring algorithm name: ${scoringAlgorithms[scoringAlgorithmSelection].name}\n\nscore for '${newWord}':\n${scoringAlgorithms[scoringAlgorithmSelection].scoringFunction(newWord)}\n`);

   } else {

      console.log(`\nScoring algorithm name: ${scoringAlgorithms[scoringAlgorithmSelection].name}\n\nscore for '${newWord}': ${scoringAlgorithms[scoringAlgorithmSelection].scoringFunction(newWord)}\n`);

   }

 

  
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   oldScrabbleScorer: oldScrabbleScorer,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

