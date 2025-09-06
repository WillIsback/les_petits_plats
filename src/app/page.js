"use client";

import styles from "./page.module.css";
import CardRecette from "@components/CardRecette/CardRecette";
import FilterSelector from "@components/FilterSelector/FilterSelector";
import { recettes } from "@data/recipes.json";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'


export default function Home() {
  const [selectedFilters, setSelectedFilters] = useState({
      ingredients: [],
      appareils: [],
      ustensiles: []
  });
  const [recipeFound, setRecipeFound] = useState(recettes);
  const [recetteNotFound, setRecetteNodFound] = useState(false);

  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  // console.log("Search param:", search);

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

  /*   Le système recherche des recettes correspondant à l’entrée utilisateur (des mots ou groupes de lettres) dans (OU):
        - le titre
        - les ingrédients 
        - description

        Il faut donc a partir des trois premieres lettres ou un groupe de mot faire un match pour filtrer out les recettes qui ne correspondent pas a la recherche.
  */
  useEffect(() => {
    if(search && search.length > 0){
      // Normaliser la recherche
      const normalizeSearch = (text) => text.toLowerCase().trim();
      // Vérifier si une recette correspond
      const recipeMatches = (recette, searchTerm) => {
        const inTitle = recette.name.toLowerCase().includes(searchTerm);
        const inIngredients = recette.ingredients.some(ing => 
          ing.ingredient.toLowerCase().includes(searchTerm)
        );
        const inDescription = recette.description.toLowerCase().includes(searchTerm);
        return inTitle || inIngredients || inDescription; // OU logique
      };

      // Filtrer les recettes
      const filteredRecipes = recettes.filter(recette => recipeMatches(recette, normalizeSearch(search)));
      // console.log("filteredRecipes : ", filteredRecipes)
      if(filteredRecipes.length > 0){
        setRecetteNodFound(false);
      }
      else{
        setRecetteNodFound(true);
      }
      setRecipeFound(filteredRecipes);
    }
    else{setRecipeFound(recettes); setRecetteNodFound(false);};
  },[search]);

  /*
    Recherche affinée par catégories avec tag selection dans une logique ET exhaustif
  */
  // Est-ce que la recette contient TOUTES les catégories sélectionnées ?
  const allRecettes = useMemo(() => {
    const recettesFound = recipeFound;
    return recettesFound.filter((recette) => {
      // Vérifier TOUS les ingrédients sélectionnés
      const hasAllIngredients = selectedFilters.ingredients.length === 0 || 
        selectedFilters.ingredients.every(selectedIng =>
          recette.ingredients.some(recipeIng => recipeIng.ingredient.toLowerCase() === selectedIng.toLowerCase())
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
      const result = hasAllIngredients && hasAllAppliances && hasAllUstensils ;
      // console.log('categories filter result : ', result);
      return result;
    });
  }, [selectedFilters, recipeFound]);


  const BATCH_SIZE = 12;

  const [displayed, setDisplayed] = useState([]);

  // Réinitialiser l'affichage quand les filtres changent
  useEffect(() => {
    setDisplayed(allRecettes.slice(0, BATCH_SIZE));
  }, [allRecettes]);

  const fetchMoreData = useCallback(() => {
    setDisplayed((prev) => {
      const nextBatch = allRecettes.slice(prev.length, prev.length + BATCH_SIZE);
      return [...prev, ...nextBatch];
    });
  }, [allRecettes]);
  // console.log(recetteNotFound)
  const hasMore = displayed.length < allRecettes.length;
  return (
    <div className={styles.page}>
      <section className={styles.filterbar}>
        <FilterSelector 
          recettes={allRecettes}
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
            <Link 
              key={`link_${recette.id}`} 
              href={`/recette/${recette.slug}`} 
              className={styles.cardLink}
            >
              <CardRecette
                key={recette.id}
                {...recette}
                searchContext={search || ''}
              />
            </Link>
          ))}
        </InfiniteScroll>
        <p className={styles.errorMessage}>{recetteNotFound && "Aucune recette trouvées ! 😭"}</p>
      </section>
    </div>
  );
}
