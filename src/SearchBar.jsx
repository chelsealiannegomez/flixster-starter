import './SearchBar.css';

const SearchBar = ( {searchQuery, setSearchQuery} ) => {
    return (
        <div>
            <input type="text" value={searchQuery} placeholder="Search" onChange={(event) => setSearchQuery(event.target.value)} className="search-bar"/>
        </div>
    )
}
export default SearchBar