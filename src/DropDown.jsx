import './DropDown.css';

const DropDown = ( {sortMovies, setSortMovies } ) => {
    return (
        <label>
            Sort&nbsp;
            <select value={sortMovies} onChange={e => setSortMovies(e.target.value)}>
                <option>Default</option>
                <option>Sort By Title</option>
                <option>Sort By Release Date</option>
                <option>Sort By Vote Average</option>
            </select>
        </label>
    )
}
export default DropDown;