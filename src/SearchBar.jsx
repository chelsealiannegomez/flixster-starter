const SearchBar = ( {searchQuery, setSearchQuery} ) => {
    return (
        <div>
            <input type="text" value={searchQuery} placeholder="Search" onChange={(event) => setSearchQuery(event.target.value)} />
            {/* value={searchQuery} onChange={handleSearchChange} */}
        </div>
    )
}
export default SearchBar