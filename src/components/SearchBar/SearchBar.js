'use client'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from "react";
import styles from './SearchBar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';   
import { useForm } from "react-hook-form"


export default function SearchBar() {
  const { 
    register, 
    handleSubmit,
    setValue,
  } = useForm();

  const searchParams = useSearchParams(); 
  const router = useRouter();
  const pathname = usePathname();

  // Initialiser avec la valeur des searchParams
  useEffect(() => {
    const currentSearch = searchParams.get('search') || '';
    setValue('search', currentSearch);
  }, [searchParams, setValue]);

  const onSubmit = (data) => {
    // console.log('submit data', data);
    
    // Créer une nouvelle instance de URLSearchParams
    const params = new URLSearchParams(searchParams.toString());
    
    // Nettoyer la valeur de recherche
    const searchValue = data.search ? data.search.trim() : '';
    
    if (searchValue.length >= 3) {
      params.set('search', searchValue);
    } else {
      params.delete('search');
    }
    
    // Naviguer avec les nouveaux paramètres
    router.push(`${pathname}?${params.toString()}`);
  }

  return <form action="" 
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        {...register("search")}
        placeholder="Rechercher une recette, un ingredient"
        defaultValue={''}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchbaricon} />
      </button>
    </form>
}


