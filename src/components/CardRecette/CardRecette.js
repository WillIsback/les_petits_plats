import styles from './CardRecette.module.css'
import ListItem from '@components/ListItem/ListItem'

export default function CardRecette (props) {
    const { image, name, servings, ingredients,
        time, description, appliance, ustensils } = props;
    const imgpath = "/images/recipes/"

    return <article className={styles.carterecette}>
        <div className={styles.imgcontainer}>
            <img src={`${imgpath}${image}`} alt={name} />
            <time>{time}min</time>
        </div>
        <div className={styles.cardbody}>
            <h2>{name}</h2>
            <h3>RECETTE</h3>
            <p className={styles.rescettedescription}>{description}</p>
            <h3>INGRÉDIENTS</h3>
            <div className={styles.itembox}>
                {ingredients.map((ingredient) => (
                    <ListItem
                    key={`nom_${ingredient.ingredient}`}
                    {...ingredient}
                    />
                ))}
            </div>
        </div>
        </article>
}