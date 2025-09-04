'use client'
import { useSearchParams } from 'next/navigation'
import styles from './SearchBar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';   

export default function SearchBar() {
  const searchParams = useSearchParams()
 
  const search = searchParams.get('search')
 
  // This will be logged on the server during the initial render
  // and on the client on subsequent navigations.
  console.log(search)
 
  function handleSubmit(e){
    e.preventDefault;

  }
  return <form action="" method="get" className={styles.form}>
      <input
        type="text"
        name="search"
        placeholder="Rechercher une recette, un ingredient"
        defaultValue={search || ''}
        className={styles.input}
      />
      <button type="submit" 
        className={styles.button}
        onSubmit={(e) => handleSubmit(e)}
        >
        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchbaricon} />
        </button>
    </form>
}


