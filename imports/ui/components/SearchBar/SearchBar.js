import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

const colors = [
    'Red',
    'Orange',
    'Yellow',
    'Green',
    'Blue',
    'Purple',
    'Black',
    'White'
];

const SearchBar = () => (
    <AutoComplete hintText="Search Gamer" dataSource={colors} />
);

export default SearchBar;
