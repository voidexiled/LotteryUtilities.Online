import type { Profile } from "@/vite-env";

export const defaultProfile: Profile = {
	name: "Default",
	pdfOptions: {
		paperSize: "A4",
		tableSize: {
			width: 7.6,
			height: 12.4,
		},
	},
	tableOptions: {
		size: "4x4",
		comodin: null,
		comodinPosition: null,
		random: false,
		skipFigures: [55],
	},
};

export const DEFAULT_PROFILES: Profile[] = [
	defaultProfile,
	{
		name: "5x5",
		pdfOptions: {
			paperSize: "A4",
			tableSize: {
				width: 17,
				height: 26,
			},
		},
		tableOptions: {
			size: "5x5",
			comodin: null,
			comodinPosition: null,
			random: true,
		},
	},
	{
		name: "Comodina54Figuras",
		pdfOptions: {
			paperSize: "A4",
			tableSize: {
				width: 7.4,
				height: 12.7,
			},
		},
		tableOptions: {
			size: "4x4",
			comodin: [55],
			comodinPosition: [
				{
					id: 0,
					figureId: 55,
					positions: [1, 2, 4, 7, 8, 11, 13, 14],
				},
			],
			random: false,
		},
	},
	{
		name: "54 figuras 4x4",
		pdfOptions: {
			paperSize: "A4",
			tableSize: {
				width: 7.4,
				height: 12.7,
			},
		},
		tableOptions: {
			size: "4x4",
			comodin: null,
			comodinPosition: null,
			random: false,
			skipFigures: [55],
		},
	},
	{
		name: "America",
		pdfOptions: {
			paperSize: "A4",
			tableSize: {
				width: 7.4,
				height: 12.7,
			},
		},
		tableOptions: {
			size: "5x5",
			comodin: [41],
			comodinPosition: [
				{
					id: 0,
					figureId: 41,
					positions: [0, 4, 6, 8, 12, 16, 18, 20, 25],
				},
			],
			random: false,
			skipFigures: null,
		},
	},
	{
		name: "Jazz",
		pdfOptions: {
			paperSize: "A4",
			tableSize: {
				width: 7.4,
				height: 12.7,
			},
		},
		tableOptions: {
			size: "4x4",
			comodin: [55],
			comodinPosition: [
				{
					id: 0,
					figureId: 55,
					positions: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
				},
			],
			random: true,
			skipFigures: null,
		},
	},
	{
		name: "Pozo Especial",
		pdfOptions: {
			paperSize: "A4",
			tableSize: {
				width: 6.8,
				height: 10.2,
			},
		},
		tableOptions: {
			size: "2x2",
			comodin: null,
			comodinPosition: null,
			random: true,
			skipFigures: null,
		},
	},
	{
		name: "Test",
		pdfOptions: {
			paperSize: "A4",
			tableSize: {
				width: 7.4,
				height: 12.7,
			},
		},
		tableOptions: {
			size: "5x5",
			comodin: [1, 2],
			comodinPosition: [
				{
					id: 0,
					figureId: 1,
					positions: [0, 4, 20, 24],
				},
				{
					id: 1,
					figureId: 1,
					positions: [12],
				},
				{
					id: 2,
					figureId: 2,
					positions: [],
				},
			],
			random: false,
			skipFigures: null,
		},
	},
	{
		name: "Cinthia",
		pdfOptions: {
			paperSize: "A4",
			tableSize: {
				width: 7.4,
				height: 12.7,
			},
		},
		tableOptions: {
			size: "4x4",
			comodin: null,
			comodinPosition: null,
			random: true,
			skipFigures: null,
		},
	},
];
