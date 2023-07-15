// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function transform(oldPointStructure) {

   let newPointStructure = {};

   for (key in oldPointStructure) {

      for (let i = 0; i < oldPointStructure[key].length; i++) {

         newPointStructure[oldPointStructure[key][i]] = key;

      }
   }

   return newPointStructure;

}

let newPointStructure = transform(oldPointStructure);

function scrabbleScorer(word) {

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

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {

   console.log("\nLet's play some scrabble!");

   let word = input.question("\nEnter a word to score: ");

   let letters = /^[A-Za-z]+$/;

   while (!word.match(letters)) {

      word = input.question("\nEnter a word to score: ");

   }
   return word;
}

function simpleScorer(word) {
   
   word = word.toUpperCase();

   let letterPoints = 0;

   for (let i = 0; i < word.length; i++) {

      letterPoints += 1;
   }

   return letterPoints;
}

function vowelBonusScorer(word) {

   word = word.toUpperCase();

   let letterPoints = 0;

   for (let i = 0; i < word.length; i++) {

      if (word[i] === 'A' || word[i] === 'E' || word[i] === 'I' || word[i] === 'O' || word[i] === 'U') {

         letterPoints += 3;

      } else {

         letterPoints += 1;
      }
      
   }
   return letterPoints;
}

let simpleScore = {

   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scoringFunction: function(word) { return(simpleScorer(word)); }


};

let bonusVowels = {

   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scoringFunction: function(word) { return(vowelBonusScorer(word)); }

};

let scrabble = {

   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scoringFunction: function(word) { return(scrabbleScorer(word)); }

};

const scoringAlgorithms = [simpleScore, bonusVowels, scrabble];

function scorerPrompt() {

   let scoringSelection = Number(input.question(`\n\nWhich scoring algorithm would you like to use? \n\nSimple Score = 0 (One point per character)\nBonus Vowels = 1 (Vowels = 3 pts, Consonants = 1 pt)\nScrabble = 2 (Uses Scrabble Point System)\n\nEnter a number from 0-2: `));

   while (scoringSelection < 0 || scoringSelection > scoringAlgorithms.length - 1 || scoringSelection > (Math.trunc(scoringSelection)) && scoringSelection < (Math.trunc(scoringSelection + 1)) || Number.isNaN(scoringSelection)) {

      scoringSelection = Number(input.question(`\n\nWhich scoring algorithm would you like to use? \n\nSimple Score = 0\nBonus Vowels = 1\nScrabble = 2\n\nEnter a number from 0-2: `));

   }

   return scoringSelection;
} 


function runProgram() {

  let newWord = initialPrompt();
  let scoringAlgorithmSelection = scorerPrompt();
  console.log(`\n\nScoring algorithm name: ${scoringAlgorithms[scoringAlgorithmSelection].name}\nscore for '${newWord}': ${scoringAlgorithms[scoringAlgorithmSelection].scoringFunction(newWord)}\n`);
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

