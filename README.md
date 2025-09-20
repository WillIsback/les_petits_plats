# Les Petits Plats

## À propos du projet

Ce projet est le **Projet 5 (P5 - Sites Complexes avec React)** de la formation **Développeur IA** d'OpenClassrooms, réalisé par **William Derue**.

**Mission** : Développer une application web de recherche de recettes de cuisine pour l'entreprise "Les Petits Plats", permettant de consulter et filtrer leurs 50 recettes les plus populaires.

## Fonctionnalités

- 🍳 Affichage de 50 recettes de cuisine
- 🔍 Recherche par nom de recette, ingrédients ou description
- 🏷️ Filtres par ingrédients, appareils et ustensiles
- 📱 Interface responsive et moderne
- ⚡ Optimisé avec Next.js et React 19

## Technologies utilisées

- **Next.js 15.5.2** (avec Turbopack)
- **React 19.1.0**
- **React Hook Form** pour la gestion des formulaires
- **React Select** pour les composants de sélection
- **FontAwesome** pour les icônes
- **ESLint** pour la qualité du code

## Installation et démarrage

### Prérequis

- Node.js (version 18.17.0 ou supérieure)
- npm, yarn, pnpm ou bun

### Installation

1. **Cloner le projet**
   ```bash
   git clone https://github.com/WillIsback/les_petits_plats.git
   cd les_petits_plats
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **⚠️ IMPORTANT : Récupérer les images des recettes**
   
   Les images des recettes (>200Mo) ne sont pas incluses dans l'archive ZIP en raison des limitations de taille du dépôt de livrables.
   
   **Suivez ces étapes pour récupérer les images :**
   
   a. **Créer le dossier de destination**
   ```bash
   mkdir -p public/recipes
   ```
   
   b. **Télécharger l'archive des images**
   ```bash
   # Télécharger l'archive depuis OpenClassrooms
   wget https://course.oc-static.com/projects/D%C3%A9veloppeur+Web/JS/P7/JSON+recipes.zip
   # ou téléchargez manuellement depuis le lien ci-dessus
   ```
   
   c. **Extraire et déplacer les images**
   ```bash
   # Extraire l'archive
   unzip "JSON+recipes.zip"
   
   # Déplacer toutes les images Recette**.jpg vers le dossier public/recipes
   mv "JSON recipes"/*.jpg public/recipes/
   
   # Nettoyer les fichiers temporaires
   rm -rf "JSON recipes" "JSON+recipes.zip"
   ```
   
   **Alternative : Téléchargement manuel**
   1. Téléchargez l'archive : https://course.oc-static.com/projects/D%C3%A9veloppeur+Web/JS/P7/JSON+recipes.zip
   2. Créez le dossier `public/recipes/` dans votre projet
   3. Extrayez l'archive et copiez toutes les images `Recette**.jpg` dans `public/recipes/`

4. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   # ou
   bun dev
   ```

5. **Ouvrir l'application**
   
   Rendez-vous sur [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Scripts disponibles

- `npm run dev` - Démarre le serveur de développement avec Turbopack

## Structure du projet

```
les_petits_plats/
├── public/              # Images des recettes (à télécharger depuis GitHub)
├── src/
│   ├── app/            # Pages et layouts (App Router)
│   ├── components/     # Composants React réutilisables
│   └── data/          # Données des recettes (JSON)
├── package.json
├── next.config.mjs
├── jsconfig.json
└── README.md
```

## Liens utiles

- **Dépôt GitHub complet** : https://github.com/WillIsback/les_petits_plats
- **Dossier public (images)** : https://github.com/WillIsback/les_petits_plats/tree/main/public
- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation React](https://react.dev)

## Note pour l'évaluateur

Ce projet utilise les dernières versions de React (19.1.0) et Next.js (15.5.2) avec le nouveau App Router. L'application est optimisée avec Turbopack pour des performances de développement améliorées.

**⚠️ N'oubliez pas de télécharger le dossier `public` depuis le lien GitHub ci-dessus avant de lancer l'application.**

---

**Étudiant** : William Derue  
**Formation** : Développeur IA - OpenClassrooms  
**Projet** : P5 - Sites Complexes avec React