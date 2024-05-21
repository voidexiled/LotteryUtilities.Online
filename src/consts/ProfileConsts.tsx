import type { Profile } from "@/vite-env";

export const defaultProfile: Profile = {
	name: "Default",
	pdfOptions: {
		paperSize: "A4",
		tableSize: {
			width: 8.5,
			height: 11,
		},
	},
	tableOptions: {
		size: "4x4",
		comodin: null,
		comodinPosition: null,
	},
};

export const DEFAULT_PROFILES: Profile[] = [
	defaultProfile,
	{
		name: "1 Comodin",
		pdfOptions: {
			paperSize: "A4",
			tableSize: {
				width: 8.5,
				height: 11,
			},
		},
		tableOptions: {
			size: "4x4",
			comodin: [1],
			comodinPosition: [
				{
					figureId: 1,
					positions: [5, 6, 9, 10],
				},
			],
		},
	},
	{
		name: "2 Comodines",
		pdfOptions: {
			paperSize: "A4",
			tableSize: {
				width: 8.5,
				height: 11,
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
		},
	},
	{
		name: "4 Comodines",
		pdfOptions: {
			paperSize: "A4",
			tableSize: {
				width: 8.5,
				height: 11,
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
		},
	},
	{
		name: "Test profile",
		pdfOptions: {
			paperSize: "A4",
			tableSize: {
				width: 8.5,
				height: 11,
			},
		},
		tableOptions: {
			size: "4x4",
			comodin: [4, 5],
			comodinPosition: [
				{
					figureId: 4,
					positions: [0],
				},
				{
					figureId: 4,
					positions: [0, 12, 15],
				},
				{
					figureId: 5,
					positions: [5],
				},
				{
					figureId: 5,
					positions: [5, 9, 10],
				},
			],
		},
	},
];
