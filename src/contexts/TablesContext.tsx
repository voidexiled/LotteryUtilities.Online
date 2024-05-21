import type { Table, TablesContextType } from "@/vite-env";
import { createContext, useEffect, useState } from "react";

import localforage from "localforage";
import { getURLImage } from "@/utils/utils";
export const TablesContext = createContext<TablesContextType | null>(null);

export const TablesProvider = ({ children }: any) => {
	const [transformingToDataUrl, setTransformingToDataUrl] = useState(false);
	const [currentLoaded, setCurrentLoaded] = useState(0);
	const [totalTables, setTotalTables] = useState(0);
	const [loading, setLoading] = useState(true);
	const [currentTable, setCurrentTable] = useState<Table | null>(null);
	const [tables, setTables] = useState<Table[]>([]);

	const emptyTables = () => {
		setTables([]);
	};

	const addTables = (_tables: Table[]) => {
		setTables([...tables, ..._tables]);
	};

	const addTable = (table: Table) => {
		setTables([...tables, table]);
	};

	const removeTable = (id: string) => {
		setTables(tables.filter((t) => t.id !== id));
	};

	const updateTable = (table: Table) => {
		setTables(tables.map((t) => (t.id === table.id ? table : t)));
	};

	const getTable = (id: string) => {
		return tables.find((t) => t.id === id) || null;
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const tryGetTables = async () => {
			const savedTables = await localforage.getItem("tables");
			if (savedTables) {
				const tablesFormatted = savedTables as Table[];
				setTransformingToDataUrl(true);
				setTotalTables(tablesFormatted.length);

				tablesFormatted.map(async (t) => {
					const newImageURL = await getURLImage(t).then((url) => url);
					t.imageURL = newImageURL;
					setCurrentLoaded(currentLoaded + 1);
					return t;
				});

				setTables(tablesFormatted);
			}
		};

		tryGetTables().then(() => {
			setLoading(false);
		});
	}, []);

	useEffect(() => {
		const settingTables = async () => {
			const localTables = await localforage.getItem("tables");
			if (tables !== localTables) {
				// const startAt = Date.now();
				// console.log("STARTING LOCALFORAGE SETTING TABLES");
				const tablesToUpload = tables.filter((t) => () => {
					const copyTable: Table = { ...t };
					copyTable.imageURL = "";
					return copyTable;
				});

				await localforage.setItem("tables", tablesToUpload);
				// const endAt = Date.now();
				// console.log(
				// 	`FINISHED LOCALFORAGE SETTING TABLES ${endAt - startAt} ms`,
				// );

				setTransformingToDataUrl(false);
			}
		};

		settingTables();
	}, [tables]);

	return (
		<TablesContext.Provider
			value={{
				loading,
				setCurrentTable,
				currentTable,
				tables,
				setTables,
				addTable,
				addTables,
				removeTable,
				updateTable,
				getTable,
				emptyTables,
				transformingToDataUrl,
				totalTables,
				currentLoaded,
			}}
		>
			{children}
		</TablesContext.Provider>
	);
};
// export const TablesProvider = memo(TablesProviderN);
