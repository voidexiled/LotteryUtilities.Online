import { GeneratorWrapper } from "../GeneratorWrapper"
import { TableGeneratorForm } from "./TableGeneratorForm"
import { TableThumbList } from "./TableThumbList"

export const TableView = () => {
    return (
        <>
            <GeneratorWrapper>
                <TableGeneratorForm />
            </GeneratorWrapper>
            <TableThumbList />
        </>
    )
}