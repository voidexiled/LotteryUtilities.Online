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
		random: true,
	},
};

export const DEFAULT_PROFILES: Profile[] = [
	defaultProfile,
	{
		name: "1 Comodin",
		pdfOptions: {
			paperSize: "A4",
			tableSize: {
				width: 6.2,
				height: 12.7,
			},
		},
		tableOptions: {
			size: "4x4",
			comodin: [55],
			comodinPosition: [
				{
					figureId: 55,
					positions: [5, 6, 9, 10],
				},
			],
			random: true,
		},
	},
	{
		name: "2 Comodines",
		pdfOptions: {
			paperSize: "A4",
			tableSize: {
				width: 7.4,
				height: 12.7,
			},
		},
		tableOptions: {
			size: "4x4",
			comodin: [2, 2],
			comodinPosition: [
				{
					figureId: 2,
					positions: [0, 3, 12, 15],
				},
				{
					figureId: 2,
					positions: [0, 3, 12, 15],
				},
			],
			random: true,
		},
	},
	{
		name: "4 Comodines",
		pdfOptions: {
			paperSize: "A4",
			tableSize: {
				width: 5,
				height: 12.7,
			},
		},
		tableOptions: {
			size: "4x4",
			comodin: [4, 5, 6, 7],
			comodinPosition: [
				{
					figureId: 4,
					positions: [0, 3, 12, 15],
				},
				{
					figureId: 5,
					positions: [0, 3, 12, 15],
				},
				{
					figureId: 6,
					positions: [0, 3, 12, 15],
				},
				{
					figureId: 7,
					positions: [0, 3, 12, 15],
				},
			],
			random: true,
		},
	},
	{
		name: "Test profile",
		pdfOptions: {
			paperSize: "A4",
			tableSize: {
				width: 7.4,
				height: 12.7,
			},
		},
		tableOptions: {
			size: "4x4",
			comodin: [1],
			comodinPosition: [
				{
					figureId: 1,
					positions: [0, 3],
				},


			],
			random: false,
		},
	},
];
