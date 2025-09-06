import styles from './ListItem.module.css'

export default function ListItem (props) {
    const { ingredient, quantity, unit, searchContext, wrapInHighlight } = props;


    return <article className={styles.ingredient}>
            <h4>{wrapInHighlight(searchContext, ingredient)}</h4>
            <p>{quantity} {unit}</p>
    </article>
}