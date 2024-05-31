import prand from "pure-rand";

export function generateRandomMatrix(
	n: number,
	min: number,
	max: number,
	skip?: number[],
): number[][] {
	const matrix: number[][] = [];
	const usedValues = new Set<number>(); // Usamos un Set para rastrear los valores usados

	for (let i = 0; i < n; i++) {
		const row: number[] = [];
		for (let j = 0; j < n; j++) {
			let randomNum: number;
			do {
				// if (row.length > 0) {
				//   randomNum = getRandom(min, max, row[row.length - 1]);
				// } else {
				//   randomNum = getRandom(min, max);
				// }
				randomNum = getRandom(min, max, row[row.length - 1]);
			} while (skip?.includes(randomNum) || usedValues.has(randomNum)); // Verificamos si el valor ya fue usado
			usedValues.add(randomNum); // Agregamos el valor usado al Set
			row.push(randomNum);
		}
		matrix.push(row);
	}

	return matrix;
}

type continousMatrixReturnType = {
	matrix: number[][];
	candidates: Set<number>;
};

export function generateContinousMatrix(
	n: number,
	min: number,
	max: number,
	skip?: number[],
	lastCandidates?: Set<number>,
): continousMatrixReturnType {
	const matrix: number[][] = [];
	console.log(lastCandidates);
	let candidates = lastCandidates ?? refillCandidates(min, max);
	console.log(candidates);
	console.log(candidates.size);
	candidates =
		candidates.size === 0 ? shuffleSet(refillCandidates(min, max)) : candidates;
	for (let x = 0; x < n; x++) {
		const row: number[] = [];
		for (let y = 0; y < n; y++) {
			let randomNumber: number;
			do {
				console.log("size: ", candidates.size);
				if (candidates.size === 0) {
					candidates = shuffleSet(refillCandidates(min, max));
					console.log("refill");
				}
				randomNumber = getRandomFromSet(candidates, row[row.length - 1]);
			} while (skip?.includes(randomNumber));
			candidates.delete(randomNumber);
			row.push(randomNumber);
		}
		matrix.push(row);
	}
	console.log(candidates);
	return { matrix, candidates };
}

function refillCandidates(min: number, max: number): Set<number> {
	const newCandidates = new Set<number>();
	for (let i = min; i < max; i++) {
		newCandidates.add(i);
	}
	return newCandidates;
}

function getRandomFromSet(set: Set<number>, seed?: number): number {
	const min = Math.min(...set);
	const max = Math.max(...set);
	let randomNumber: number;

	do {
		randomNumber = getRandom(min, max, seed);
	} while (!set.has(randomNumber));
	return randomNumber;
}

function shuffleSet(set: Set<number>): Set<number> {
	const shuffledSet = new Set<number>();
	const array = [...set];
	for (let i = array.length - 1; i > 0; i--) {
		const j = getRandom(0, i);
		[array[i], array[j]] = [array[j], array[i]];
	}
	// biome-ignore lint/complexity/noForEach: <explanation>
	array.forEach((value) => {
		return shuffledSet.add(value);
	});
	return shuffledSet;
}

/**
 * Generates a random number between the specified minimum and maximum values.
 *
 * @param min - The minimum value of the range.
 * @param max - The maximum value of the range.
 * @returns A random number between the minimum and maximum values.
 */
export function getRandom(min: number, max: number, prevRandom?: number) {
	const _seed = prevRandom
		? (prevRandom ** Date.now()) ^ (Math.random() * 0x100000000)
		: Date.now() ^ (Math.random() * 0x100000000);

	const rng = prand.xoroshiro128plus(_seed);
	const rand = (min: number, max: number) => {
		const out = (rng.unsafeNext() >>> 0) / 0x100000000;
		return min + Math.floor(out * (max - min + 1));
	};

	return rand(min, max);
}

/**
 * Generates a shuffled array of numbers between the specified minimum and maximum values.
 * @param min The minimum value of the range (inclusive).
 * @param max The maximum value of the range (inclusive).
 * @returns The shuffled array of numbers.
 */
export function generateShuffledArray(min: number, max: number): number[] {
	const originalArray = Array.from(
		{ length: max - min + 1 },
		(_, index) => index + min,
	);
	const shuffledArray = [...originalArray];

	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = getRandom(0, i);
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}

	return shuffledArray;
}

/**
 * Shuffles the elements of an array randomly.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} array - The array to be shuffled.
 * @returns {T[]} - The shuffled array.
 */
export function shuffleArray<T>(array: T[]): T[] {
	const shuffledArray = [...array];

	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = getRandom(0, i);
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}

	return shuffledArray;
}
