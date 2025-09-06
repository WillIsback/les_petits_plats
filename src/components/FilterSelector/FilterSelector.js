"use client";
import styles from './FilterSelector.module.css'
import DropDown from '@components/DropDown/DropDown';


export default function FilterSelector (props) {
  const { recettes, selectedFilters, onAddFilter, onRemoveFilter  } = props



  const processRecipeData = (recettes) => {
    const cleanList = (items, keyExtractor = item => item) => {
      const seen = new Set();
      return items
        .map(keyExtractor)
        .filter(item => {
          if (!item || typeof item !== 'string') return false;
          const key = item.toLowerCase();
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .map(item => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase());
    };

    return {
      ingredients: cleanList(
        recettes.flatMap(r => r.ingredients), 
        ing => ing.ingredient
      ),
      appareils: cleanList(
        recettes.flatMap(r => r.appliance)
      ),
      ustensiles: cleanList(
        recettes.flatMap(r => r.ustensils)
      )
    };
  };

  const cleanedData = processRecipeData(recettes)
  const dropdownsData = [
    {
      type: 'Ingrédients',
      key: 'ingredients',
      items: cleanedData.ingredients
    },
    {
      type: 'Appareils', 
      key: 'appareils',
      items: cleanedData.appareils
    },
    {
      type: 'Ustensiles',
      key: 'ustensiles', 
      items: cleanedData.ustensiles
    }
  ];

  const nbRecettes = recettes.length;

  return <div className={styles.filtersnstagsbox}>
  {/* DropDown */}
  <div className={styles.selector_counter_box}>
    <div className={styles.filterselector}>
      {dropdownsData.map((dropdown) => (
        <DropDown 
          key={dropdown.key}
          items={dropdown.items}
          type={dropdown.type}
          category={dropdown.key}
          onAddFilter={onAddFilter}
          onRemoveFilter={onRemoveFilter}
          selectedFilters={selectedFilters}
        />
      ))}
    </div>
    <section name="Recettes_displayed" className={styles.counter}>{nbRecettes} recettes</section>
  </div>
  {/* La banniere des tags Line */}
  <div className={styles.tagfilterbar}>
    {Object.entries(selectedFilters).map(([category, filters]) => (
      filters.map((tag, index) => (
        <div key={`${category}-${tag}-${index}`} className={styles.filtertag}>
          {tag}
        </div>
      ))
    ))}
  </div>
</div>
}