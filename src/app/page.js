"use client";

import Image from "next/image";
import styles from "./page.module.css";
import CardRecette from "@components/CardRecette/CardRecette";
import FilterSelector from "@components/FilterSelector/FilterSelector";
import { recettes } from "@data/recipes.json";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useCallback } from "react";

export default function Home(props) {
  const { recettegrid } = props;
  const allRecettes = recettes;
  const BATCH_SIZE = 12;
  const [displayed, setDisplayed] = useState(allRecettes.slice(0, BATCH_SIZE));


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
        <FilterSelector recettes={recettes}/>
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
