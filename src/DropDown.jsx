import { useState } from 'react';

import './DropDown.css';

const DropDown = ( {sortMovies, setSortMovies} ) => {
    const [style, setStyle] = useState("dropdown-closed");

    return (
        <label>
            Sort
            <select value={sortMovies} onChange={e => setSortMovies(e.target.value)}>
                <option label=""></option>
                <option>Sort By Title</option>
                <option>Sort By Release Date</option>
                <option>Sort By Vote Average</option>
            </select>
        </label>
    )
}
export default DropDown;