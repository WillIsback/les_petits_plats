"use client";

import styles from "./page.module.css";
import CardRecette from "@components/CardRecette/CardRecette";
import FilterSelector from "@components/FilterSelector/FilterSelector";
import { recettes } from "@data/recipes.json";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useCallback, useEffect, useMemo } from "react";

export default function Home() {
  const [selectedFilters, setSelectedFilters] = useState({
      ingredients: [],
      appareils: [],
      ustensiles: []
  });

  // ajout d'un item dans la selection
  const handleAddFilter = (category, item) => {
    setSelectedFilters(prev => {
      // Sécurité : vérifier que la category existe
      if (!prev[category]) {
        console.warn(`Category "${category}" doesn't exist in selectedFilters`);
        return prev;
      }
      
      return {
        ...prev,
        [category]: prev[category].includes(item) 
          ? prev[category] 
          : [...prev[category], item]
      };
    });
  };

  // suppression d'un item dans la selection
  const handleRemoveFilter = (category, item) => {
    setSelectedFilters(prev => {
      // Sécurité : vérifier que la category existe
      if (!prev[category]) {
        console.warn(`Category "${category}" doesn't exist in selectedFilters`);
        return prev;
      }
      
      return {
        ...prev,
        [category]: prev[category].filter(filterItem => filterItem !== item)
      };
    });
  };


  // Est-ce que la recette contient TOUTES les catégories sélectionnées ?
  const allRecettes = useMemo(() => {
    return recettes.filter((recette) => {
      // Vérifier TOUS les ingrédients sélectionnés
      const hasAllIngredients = selectedFilters.ingredients.length === 0 || 
        selectedFilters.ingredients.every(selectedIng =>
          recette.ingredients.some(recipeIng => recipeIng.ingredient === selectedIng)
        );

      // Vérifier TOUS les appareils sélectionnés
      const hasAllAppliances = selectedFilters.appareils.length === 0 || 
        selectedFilters.appareils.every(selectedApp =>
          recette.appliance === selectedApp
        );

      // Vérifier TOUS les ustensiles sélectionnés
      const hasAllUstensils = selectedFilters.ustensiles.length === 0 || 
        selectedFilters.ustensiles.every(selectedUst =>
          recette.ustensils.some(recipeUst => 
            recipeUst.toLowerCase() === selectedUst.toLowerCase()
          )
        );

      // Retourner true SEULEMENT si TOUTES les conditions sont remplies
      return hasAllIngredients && hasAllAppliances && hasAllUstensils;
    });
  }, [selectedFilters]);

  // Réinitialiser l'affichage quand les filtres changent
  useEffect(() => {
    setDisplayed(allRecettes.slice(0, BATCH_SIZE));
  }, [allRecettes]);

  const BATCH_SIZE = 12;

  const [displayed, setDisplayed] = useState([]);
  
  useEffect(() => {
    setDisplayed(allRecettes.slice(0, BATCH_SIZE));
  }, [allRecettes]);

  const fetchMoreData = useCallback(() => {
    setDisplayed((prev) => {
      const nextBatch = allRecettes.slice(prev.length, prev.length + BATCH_SIZE);
      return [...prev, ...nextBatch];
    });
  }, [allRecettes]);

  const hasMore = displayed.length < allRecettes.length;

  return (
    <div className={styles.page}>
      <section className={styles.filterbar}>
        <FilterSelector 
          recettes={recettes}
          selectedFilters={selectedFilters}
          onAddFilter={handleAddFilter}
          onRemoveFilter={handleRemoveFilter}
        />
      </section>
      <section className={styles.recettesection}>
        <InfiniteScroll
          className={styles.recettegrid}
          dataLength={displayed.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Chargement...</h4>}
        >
          {displayed.map((recette) => (
            <CardRecette
              key={recette.id}
              {...recette}
            />
          ))}
        </InfiniteScroll>
      </section>
    </div>
  );
}
