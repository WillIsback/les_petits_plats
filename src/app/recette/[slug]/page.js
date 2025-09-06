import { recettes } from "@data/recipes.json";
import styles from "./page.module.css";
import { notFound } from 'next/navigation'


async function fetchRecette(slug) {
  const recette = recettes.find(r => r.slug === slug);
  if (!recette) return undefined
  return recette
}

export default async function Recette({ params }) {
  const { slug } = await params;
  const recette = await fetchRecette(slug)

  if (!recette) {
    notFound()
  }
    
  const imgpath = "/images/recipes/"
  const { image, name, servings, ingredients, time, description, appliance, ustensils} = recette;
  const splitedDescription = description.split('.');
  console.log(splitedDescription);

  return (
    <main className={styles.main}>
      <section className={styles.image}>
        <img src={`${imgpath}${image}`} alt={name} />
      </section>
      <article className={styles.article}>
        <h2>{name}</h2>
        <section><h3>Temps de Préparation</h3><span>{time}min</span></section>
        <section><h3>Ingrédients</h3>
        <ul className={styles.liste}>
          {ingredients.map(({ ingredient, quantity, unit, idx }) => {
            return <li><h4>{ingredient}</h4> {!unit ? <p>{quantity}</p> : <span>{quantity} {unit}</span>}</li>
          })}
        </ul>
        </section>
        <section><h3>Ustensiles nécessaires</h3>
          <ul className={styles.liste}>
            {ustensils.map((ust) => {
              return <li>{ust}</li>
            })}
          </ul>
        </section>
        <section><h3>Appareils nécessaires</h3><p>{appliance}</p></section>
        <section><h3>Recette</h3>
          <ul className={styles.recette_description}>
            {description.split('.').map((instruction, idx) => {
              return <div aria-labelledby="recette-description">
                <h3>{`- ${idx+1}`}</h3>
                <li>{`${instruction}.`}</li>
              </div>
            }
            )}
          </ul>
        </section>
      </article>

    </main>
  );
}