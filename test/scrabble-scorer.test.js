const solution = require('../scrabble-scorer');

describe("Scrabble Scorer solution", function() {

	// transform tests //
	it("transform returns an object", function() {
		let transformedObj = solution.transform(solution.oldPointStructure);
		expect(transformedObj).toBeInstanceOf(Object);
	});

	it("transform returns an object that is not empty", function() {
		let transformedObj = solution.transform(solution.oldPointStructure);
		expect(Object.keys(transformedObj)).not.toBeNull();
	});

	it("transform returns an object with letter keys", function() {
		let transformedObj = solution.transform(solution.oldPointStructure);
		let letterKeys = Object.keys(transformedObj);
		
		let lettersEx = /[a-z]/g;

		// .every() returns true if each item in the array passes the match
		let expected = letterKeys.every(function(l) {
			return l.match(lettersEx);
		});
		
		expect(expected).toBe(true);
	});

	it("transform returns an object with integer values", function() {
		let transformedObj = solution.transform(solution.oldPointStructure);
		let numberVals = Object.values(transformedObj);

		let expected = numberVals.every(function(n) {
			return typeof n == 'number';
		});
		expect(expected).toBe(true);
	});

	// // newPointStructure tests //
	it("newPointStructure contains the correct key-value pairs", function() {
		expect(solution.newPointStructure).toEqual(expect.objectContaining({
			a: 1,
			e: 1,
			i: 1,
			o: 1,
			u: 1,
			l: 1,
			n: 1,
			r: 1,
			s: 1,
			t: 1,
			d: 2,
			g: 2,
			b: 3,
			c: 3,
			m: 3,
			p: 3,
			f: 4,
			h: 4,
			v: 4,
			w: 4,
			y: 4,
			k: 5,
			j: 8,
			x: 8,
			q: 10,
			z: 10
		}));
	});

	// simpleScorer tests //
	it("contains a simpleScorer function", function() {
		expect(solution.simpleScorer).toEqual(expect.any(Function));
	});

	it("simpleScorer returns an integer score", function() {
		expect(typeof solution.simpleScorer('foo')).toBe('number');
	});

	it("simpleScorer returns a score equal to the length of its input", function() {
		expect(solution.simpleScorer('foo')).toBe(3);
		expect(solution.simpleScorer('')).toBe(0);
	});

	// vowelBonusScorer tests //
	it("contains a vowelBonusScorer function", function() {
		expect(solution.vowelBonusScorer).toEqual(expect.any(Function));
	});

	it("vowelBonusScorer returns an integer score", function() {
		expect(typeof solution.vowelBonusScorer('foo')).toBe('number');
	});

	it("vowelBonusScorer returns three points per vowel", function() {
		expect(solution.vowelBonusScorer('a')).toBe(3);
		expect(solution.vowelBonusScorer('e')).toBe(3);
		expect(solution.vowelBonusScorer('i')).toBe(3);
		expect(solution.vowelBonusScorer('o')).toBe(3);
		expect(solution.vowelBonusScorer('u')).toBe(3);

		expect(solution.vowelBonusScorer('ae')).toBe(6);
		expect(solution.vowelBonusScorer('aei')).toBe(9);
	});

	it("vowelBonusScorer returns one point per consonant", function() {
		expect(solution.vowelBonusScorer('foo')).toBe(7);
		expect(solution.vowelBonusScorer('bar')).toBe(5);
		
	});

	// scrabbleScorer tests //
	it("contains a scrabbleScorer function", function() {
		expect(solution.scrabbleScorer).toEqual(expect.any(Function));
	});

	it("scrabbleScorer returns an integer score", function() {
		let newPointStructure = solution.transform(solution.oldPointStructure);
		expect(typeof solution.scrabbleScorer('foo', newPointStructure)).toBe('number');
	});

	it("scrabbleScorer uses transform() to score a word", function() {
		let newPointStructure = solution.transform(solution.oldPointStructure);
		expect(solution.scrabbleScorer('foo', newPointStructure)).toBe(6);
		expect(solution.scrabbleScorer('bar', newPointStructure)).toBe(5);
		expect(solution.scrabbleScorer('baz', newPointStructure)).toBe(14);
	});

	// scoringAlgorithms tests //
	it("contains a scoringAlgorithms array of three scoring objects", function() {
		expect(solution.scoringAlgorithms.length).toBe(3);
	});

	it("scoringAlgorithms contain three scoring objects", function() {
		expect(solution.scoringAlgorithms[0]).toEqual(expect.objectContaining({
			scoringFunction: solution.simpleScorer
		}));
		expect(solution.scoringAlgorithms[1]).toEqual(expect.objectContaining({
			scoringFunction: solution.vowelBonusScorer
		}));
		expect(solution.scoringAlgorithms[2]).toEqual(expect.objectContaining({
			scoringFunction: solution.scrabbleScorer
		}));
	});
	
});