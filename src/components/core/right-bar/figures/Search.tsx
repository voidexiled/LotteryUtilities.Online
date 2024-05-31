type SearchProps = {
    value: string;
    setValue: (value: string) => void;
}

export const Search = ({ value, setValue }: SearchProps) => {
    return (
        <input type="text" placeholder="Buscar figuras" className="input input-sm input-bordered input-secondary"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    )
}