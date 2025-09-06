'use client'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useEffect } from "react";
import styles from './SearchBar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';   
import { useForm } from "react-hook-form"


export default function SearchBar() {
  const { 
    register, 
    handleSubmit,
    setValue,
    watch,
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
  const clearSearch = () => {
      setValue('search', '');
      const params = new URLSearchParams(searchParams.toString())
      params.delete('search');
      router.replace('/');
  };

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
        autoComplete="off"
      />
      {((watch().search?.length>0) || false) && (
      <button 
        type="button"
        onClick={clearSearch}
        className={styles.clearButton}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
      )}
      <button type="submit" className={styles.searchbutton}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchbaricon} />
      </button>
    </form>
}


