"use client";
import { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import FilterList from '@components/FilterList/FilterList';
import styles from './DropDown.module.css';

export default function DropDown (props) {
    const { items, onAddFilter, category, 
        onRemoveFilter, selectedFilters, type } = props;

    const [open, setOpen] = useState();

    const handleToggle = (e) => {
        e.preventDefault(); 
        setOpen((prev) => !prev);
    }

    return (
    <div className={styles.detailselector}>
        <button onClick={handleToggle}>
        <aside>{type}</aside>
        <span>
            <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
        </span>
        </button>
        
        {open && (
        <div className={styles.dropdownContent}>
            <FilterList 
            key={category}
            category={category}
            items={items} 
            onAddFilter={onAddFilter}
            onRemoveFilter={onRemoveFilter}
            selectedFilters={selectedFilters}
            />
        </div>
        )}
    </div>
    );
}
