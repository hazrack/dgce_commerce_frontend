# DGE Commerce – Front Vue 3 

Ce document décrit l'environnement requis, les commandes, les versions des dépendances, l'architecture, ainsi que les actions à mener et les éléments à ajouter.

---

## 1. Présentation

Application **Vue 3 + Vite** de la solution **DGE Commerce** . Elle comprend deux espaces :

- **Front office (public)** : accueil, accords commerciaux, flux commerciaux, points de coopération, FAQ, contacts.
- **Back office (authentifié)** : tableau de bord, gestion des accords, échanges, classement des produits, organisations, produits, États membres OMC, coopérations, utilisateurs.

Le front consomme une API REST dont l'URL est fournie par la variable `VITE_API_BASE_URL`.

---

## 2. Prérequis

| Outil | Version utilisée | Remarque |
|---|---|---|
| Node.js | **20.19.5** | Node 20 LTS recommandé (minimum 18) |
| npm | **10.8.2** | Livré avec Node 20 |
| IDE | VS Code + extension **Vue - Official (Volar)** | Désactiver Vetur |

---

## 3. Installation et commandes

```sh
# 1. Cloner le dépôt
git clone https://github.com/hazrack/dgce_commerce_frontend
cd dge_commerce_front_vue3

# 2. Installer les dépendances (respecte package-lock.json)
 npm install

# 3. Créer les fichiers d'environnement (voir section 4)

# 4. Lancer en développement
npm run dev
```

### Scripts disponibles (`package.json`)

| Commande | Description | Fichier d'env chargé |
|---|---|---|
| `npm run dev` | Serveur de développement (http://localhost:**8181**, ouverture auto du navigateur) | `.env.development` |
| `npm run dev:staging` | Dev en pointant sur l'API de staging | `.env.staging` |
| `npm run dev:preprod` | Dev en pointant sur l'API de préprod | `.env.preprod` |
| `npm run build` | Build de **production** dans `dist/` | `.env.production` |
| `npm run build:staging` | Build de staging dans `dist/` | `.env.staging` |
| `npm run build:preprod` | Build de préprod dans `dist/` | `.env.preprod` |

---

## 4. Variables d'environnement

Les fichiers `.env.*`  ne sont donc **pas** récupérés au clonage : ils sont soumis en off.

Fichiers attendus à la racine :

```
.env.development
.env.staging
.env.preprod
.env.production
```

Contenu minimal de chacun :

```env
# URL de base de l'API backend (Nginx gère le reverse proxy en serveur)
VITE_API_BASE_URL=https://<hote-api>/<chemin>
```

> Seules les variables préfixées par `VITE_` sont exposées au code (`import.meta.env.VITE_...`). Ne jamais y mettre de secret : elles sont visibles dans le bundle final.
