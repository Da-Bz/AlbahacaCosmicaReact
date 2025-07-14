import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
            {children}
        </SearchContext.Provider>
    );
};

const useSearch = () => {
    return useContext(SearchContext);
};

export { SearchProvider, useSearch };