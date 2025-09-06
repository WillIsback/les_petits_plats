"use client";

import { useState, useEffect } from 'react';
import styles from './FilterList.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCircleXmark, faXmark } from '@fortawesome/free-solid-svg-icons';


export default function FilterList (props) {
    const { items, onAddFilter, onRemoveFilter, selectedFilters, category } = props;
    const [filteredItems, setFilteredItems] = useState(items || []);
    const [searchValue, setSearchValue] = useState('');
    const actualSelectedFilters = selectedFilters[category];

    useEffect(() => {
        setFilteredItems(items || []);
    }, [items]);
    
    const handleOnChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        setFilteredItems(
            items.filter(item => item.toLowerCase().includes(value.toLowerCase()))
        );
    }

    const clearSearch = () => {
        setSearchValue('');
        // remettre tous les items
        setFilteredItems(items);
    };

    return <search className={styles.searchbox}>
        <div className={styles.searchbar}>
            <input
            type="search"
            name="search"
            id="query"
            placeholder=""
            className={styles.input}
            value={searchValue || ''}
            onChange={(e) => handleOnChange(e)}
            autoComplete="off"
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchbaricon} />
            {searchValue && (
                <button 
                    type="button"
                    onClick={clearSearch}
                    className={styles.clearButton}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            )}
        </div>
        
        <section className={styles.list}>
            <ul id="results" className={styles.results}>
            {filteredItems.map((item, idx) => (
                <li key={idx}
                    onClick={() => onAddFilter(category, item)}
                    className={`${styles.item} ${actualSelectedFilters.includes(item) ? styles.itemSelected : styles.itemNotselected}`}
                >
                    {item}
                    <button 
                        className={styles.btnremove}
                        onClick={e => {e.stopPropagation(); onRemoveFilter(category, item);}}
                        
                    >
                        <FontAwesomeIcon icon={faCircleXmark} className={`${styles.removeicone} ${actualSelectedFilters.includes(item) ? '': styles.btnhidden}`} />
                    </button>
                </li>
            ))}
            </ul>
        </section>
    </search>
}