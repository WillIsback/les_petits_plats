import styles from './CardRecette.module.css'
import ListItem from '@components/ListItem/ListItem'

export default function CardRecette (props) {
    const { image, name, ingredients, time, description, searchContext } = props;
    const imgpath = "/images/recipes/"
    const normalizeSearch = (text) => text.toLowerCase().trim();
    const highlightText = (text, searchTerm) => {
        const pos = normalizeSearch(text).indexOf(searchTerm);
        if (pos === -1) return text; // Pas trouvée
        return (
            <>
                {text.slice(0, pos)}
                <mark className={styles.highlight}>{text.slice(pos, pos + searchTerm.length)}</mark>
                {text.slice(pos + searchTerm.length)}
            </>
        );
    };
    /*
        Wrapper pour ajouter un surlignement sur les mots retrouvé par le searchEngine sur la carte.
        je pense wrapper autour du mot ou du groupe de lettre une balise <mark className={styles.highlight}>

    */
    const wrapInHighlight = (term, origin) => {
        // Normaliser la recherche
        const searchTerm = normalizeSearch(term);
        // Mettre en surlignage
        if(origin.toLowerCase().includes(searchTerm)){
            return highlightText(origin, searchTerm);
        }
        else{
            return origin
        }
    }


    return <article className={styles.carterecette}>
        <div className={styles.imgcontainer}>
            <img src={`${imgpath}${image}`} alt={name} />
            <time>{time}min</time>
        </div>
        <div className={styles.cardbody}>
            <h2>{wrapInHighlight(searchContext, name)}</h2>
            <h3>RECETTE</h3>
            <p className={styles.rescettedescription}>{wrapInHighlight(searchContext, description)}</p>
            <h3>INGRÉDIENTS</h3>
            <div className={styles.itembox}>
                {ingredients.map((ingredient) => (
                    <ListItem
                    key={`nom_${ingredient.ingredient}`}
                    {...ingredient}
                    searchContext={searchContext}
                    wrapInHighlight={wrapInHighlight}
                    />
                ))}
            </div>
        </div>
        </article>
}