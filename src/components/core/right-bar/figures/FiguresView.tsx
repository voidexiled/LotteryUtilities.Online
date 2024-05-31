
import { useState } from "react";
import { FigureManagerToolDialog } from "../../tools/FigureManagerToolDialog";
import { GeneratorWrapper } from "../GeneratorWrapper"
import { FiguresList } from "./FiguresList"
import { Search } from "./Search";

export const FiguresView = () => {
    const [value, setValue] = useState("");
    const [show, setShow] = useState(false);

    return (
        <>
            <GeneratorWrapper>

                <Search value={value} setValue={setValue} />

            </GeneratorWrapper>
            <FiguresList filterValue={value} />
            <button type="button" className="btn btn-sm btn-secondary mt-3"
                onClick={() => setShow(true)}
            >
                Agregar nueva figura
            </button>
            <FigureManagerToolDialog isOpen={show} setIsOpen={setShow} />
        </>
    )
}