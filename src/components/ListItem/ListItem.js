import styles from './ListItem.module.css'

export default function ListItem (props) {
    const { ingredient, quantity, unit } = props;
    return <article className={styles.ingredient}>
            <h4>{ingredient}</h4>
            <p>{quantity} {unit}</p>
    </article>
}