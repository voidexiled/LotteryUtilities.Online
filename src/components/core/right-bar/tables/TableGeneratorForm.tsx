import { FiguresContext } from "@/contexts/FiguresContext";
import { ProfileContext } from "@/contexts/ProfileContext";
import { TablesContext } from "@/contexts/TablesContext";
import { generateRandomTable } from "@/utils/utils";
import type {
    FiguresContextType,
    ProfileContextType,
    Table,
    TablesContextType
} from "@/vite-env";
import { Trash2Icon, X, XCircle, XCircleIcon } from "lucide-react";
import {
    CheckIcon
} from "lucide-react";
import { useRef, useState } from "react";
import { useContext } from "react";
import { Flip, type Id, toast } from "react-toastify";

export const TableGeneratorForm = () => {
    const { profile } = useContext(ProfileContext) as ProfileContextType;
    const { figures } = useContext(FiguresContext) as FiguresContextType;
    const { emptyTables, addTables } = useContext(
        TablesContext,
    ) as TablesContextType;

    const [tableQuantity, setTableQuantity] = useState(1);
    const [generatingTable, setGeneratingTable] = useState(false);
    const toastId = useRef<Id | null>(null);

    const [latestCandidates, setLatestCandidates] = useState<Set<number>>(new Set());

    const notifyAddedAsync = () => {
        toastId.current = toast("Generando tablas...", {
            bodyStyle: { fontSize: "0.75rem" },
            progress: 0,
            autoClose: false,
            isLoading: true,
            type: "default",
        });
    };

    const notifyDeleted = () =>
        toast("Se han eliminado todas las tablas correctamente.", {
            type: "error",
            transition: Flip,
            autoClose: 3200,
            bodyStyle: { fontSize: "0.75rem" },
            icon: <Trash2Icon className="h-4 w-4" />,
        });

    const notifyError = (message: string) => {
        toast(message, {
            type: "error",
            transition: Flip,
            autoClose: 3200,
            bodyStyle: { fontSize: "0.75rem" },
            icon: <XCircleIcon className="h-4 w-4" />,
        });
    }

    const generate = async (): Promise<Table | undefined> => {
        const size = profile.tableOptions.size === "4x4" ? 4 : 5;
        if (profile.tableOptions.comodin && figures.length <= size * size) {
            notifyError("No hay figuras suficientes para generar la tabla.");
            return;
        }
        if (figures.length < size * size) {
            notifyError("No hay figuras suficientes para generar la tabla.");
            return;
        }


        console.log(profile, figures, figures.length)

        const { table: newTable, candidates } = await generateRandomTable(profile, figures, size, 1, figures.length, latestCandidates)
        if (newTable === null) return;
        await updateLatestCandidates(candidates);
        console.log(latestCandidates.size);
        return newTable;
    };
    // Function to update latestCandidates and wait for the state to be updated
    const updateLatestCandidates = async (candidates: Set<number>) => {
        return new Promise<void>((resolve) => {
            setLatestCandidates(candidates);
            resolve();
        });
    };

    const handleDeleteAllTables = () => {
        emptyTables();
        notifyDeleted();
    };

    const handleGenerateTable = async () => {
        const tablesToAdd: Table[] = [];
        setGeneratingTable(true);
        notifyAddedAsync();

        let batchSize = 1;
        if (tableQuantity > 10) {
            batchSize = Math.floor(tableQuantity / 10);
        }


        for (let i = 0; i < tableQuantity; i += batchSize) {
            const batchPromises = Array.from({ length: Math.min(batchSize, tableQuantity - i) }, (_, j) =>
                generate()
                    .then((table) => {
                        if (table) {
                            // for (const t of table) {
                            tablesToAdd.push(table);
                            // }
                        }
                    })
                    .finally(() => {
                        if (toastId.current) {
                            toast.update(toastId.current, {
                                progress: (i + j + 1) / tableQuantity,
                            });
                        }
                    })
            );

            await Promise.all(batchPromises);

        }

        addTables(tablesToAdd);

        if (toastId.current) {
            toast.update(toastId.current, {
                icon: <CheckIcon className="h-4 w-4" />,
                progress: 1,
                isLoading: false,
            });
        }

        setGeneratingTable(false);
    };

    return (
        <>
            <span className="hidden text-secondary lg:block">Generador</span>
            <div className="flex flex-col gap-1 pt-2 text-xs">
                <div className="flex flex-row items-center gap-2">
                    <span>Cantidad</span>
                    <input
                        type="number"
                        className="input input-sm lg:input-xs input-secondary grow"
                        placeholder="Cantidad de tablas"
                        value={tableQuantity}
                        min={1}
                        onChange={(e) =>
                            setTableQuantity(e.target.value as unknown as number)
                        }
                    />
                </div>
            </div>
            <div className="flex flex-row gap-2 pt-2 text-xs">
                <button
                    disabled={generatingTable}
                    type="button"
                    className="btn btn-accent btn-sm lg:btn-xs grow"
                    onClick={handleGenerateTable}
                >
                    <span>
                        {generatingTable ? "Generando..." : "Generar Tabla"}
                    </span>

                </button>
                <button
                    disabled={generatingTable}
                    className="btn btn-error btn-sm lg:btn-xs flex items-center justify-center text-white"
                    type="button"
                    onClick={handleDeleteAllTables}
                >
                    <span>Borrar todo</span>
                    <Trash2Icon className="h-3 w-3 transition-all duration-200 ease-out group-hover:scale-110" />
                </button>
            </div>
        </>
    )
}