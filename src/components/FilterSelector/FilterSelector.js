"use client";
import { useState} from 'react';
import styles from './FilterSelector.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faMagnifyingGlass, faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import Select, { components } from 'react-select';

const CustomOption = (props) => (
  <components.Option {...props}>
    <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      {props.label}
      {props.isSelected && (
        <FontAwesomeIcon
          icon={faCircleXmark}
          style={{ marginLeft: 8, color: "#000000ff", fontSize: "1em" }}
        />
      )}
    </span>
  </components.Option>
);

function DropdownIndicator (props) {
  return (
    <components.DropdownIndicator {...props}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchbaricon} />
    </components.DropdownIndicator>
  );
}

function getSelectConfig({ ingredientOptions, setSelectedOption, styles, DropdownIndicator, CustomOption }) {
  return {
    defaultValue: "",
    onChange: setSelectedOption,
    options: ingredientOptions,
    components: { DropdownIndicator, Option: CustomOption },
    className: styles.listitem,
    isMulti: true,
    styles: { 
      option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected
          ? "#FFD15B"
          : state.isFocused
          ? "#FFF3C1"
          : "white",
        color: "#1B1B1B",
        fontWeight: state.isSelected ? "bold" : "normal",
        fontFamily: "var(--font-manrope)",
      }),
      input: (base) => ({
        ...base,
        color: "var(--Black, #7A7A7A)",
        fontFamily: "var(--font-manrope)",
      }),
    }
  };
}

export default function FilterSelector (props) {
    const [open, setOpen] = useState(false);
      const [selectedOption, setSelectedOption] = useState(null);

    const { recettes } = props

    const ingredientNames = Array.from(
    new Set(
        recettes.flatMap(recette =>
        recette.ingredients.map(ingredient => ingredient.ingredient)
        )
    )
    );
    const ingredientOptions = ingredientNames.map(name => ({
    value: name,
    label: name
    }));

    // console.log({ingredientNames})
    const appareils = recettes.flatMap(recette => recette.appliance);
    const ustensiles = recettes.flatMap(recette => recette.ustensils);

    function handleToggle(e) {
        e.preventDefault(); 
        setOpen((prev) => !prev);
    }

    const selectConfig = getSelectConfig({
    ingredientOptions,
    setSelectedOption,
    styles,
    DropdownIndicator,
    CustomOption
    });

    return <div className={styles.filterselector}>
            <details className={styles.detailselector} open={open}>
            <summary
                onClick={(e)=>handleToggle(e)}>
                <aside>Ingrédients</aside>
                <span className={styles.chevron}>
                <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} 
                className={open ? styles.chevronOpen : ""}/>
                </span>
            </summary>
                <Select {...selectConfig}/>
            </details>

        </div>
}