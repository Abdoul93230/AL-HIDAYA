# 🕋 AL-HIDAYA - Agence de Pèlerinage de Prestige

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Bienvenue sur le dépôt du site officiel d'**AL-HIDAYA**, l'agence de référence pour le Hadj et l'Oumra au Niger. Cette application web est une vitrine luxueuse conçue pour offrir une expérience utilisateur immersive, sereine et haut de gamme aux futurs pèlerins.

---

## ✨ Fonctionnalités Clés

### 🛸 Immersion Digitale
- **Hero 3D & Countdown** : Un en-tête immersif avec un compte à rebours en temps réel pour le Hadj 2026, créant un sentiment d'anticipation et d'urgence.
- **Animations de Prestige** : Utilisation de `Framer Motion` pour des transitions fluides, des effets de parallaxe et des interactions 3D subtiles.

### 📱 Optimisation Mobile de Pointe
- **UX "Thumb-Friendly"** : Transformation des sections volumineuses (Offres, Documents, Processus) en sliders horizontaux fluides pour minimiser le défilement vertical.
- **Menu Mobile Premium** : Une interface de navigation flottante avec effet de flou (Glassmorphism) adaptée aux smartphones.

### 💎 Sections de Contenu
- **Grille "Bento" Pourquoi Nous** : Présentation moderne des avantages de l'agence avec un bandeau défilant (Marquee) des partenaires officiels.
- **Offres Dynamiques** : Cartes magnétiques affichant les détails des forfaits Hadj et Oumra avec badges de rareté pour booster la conversion.
- **Méthode AL-HIDAYA** : Un parcours étape par étape pour rassurer le client sur l'accompagnement de l'agence.
- **FAQ Intelligente** : Système de questions-réponses optimisé (Accordéon sur mobile, Vue split sur desktop).

### 🛠 Conversion & Contact
- **Formulaire de Devis** : Interface de contact propre et rapide.
- **Intégration WhatsApp** : Bouton de contact direct flottant pour une assistance instantanée.
- **Newsletter** : Système d'inscription pour fidéliser les prospects.

---

## 🚀 Technologies Utilisées

- **Frontend** : React 18+ via Vite.
- **Styling** : Tailwind CSS (Utilitaires personnalisés, animations de shimmer et marquee).
- **Icons** : Lucide React (Consistance et élégance).
- **Animations** : Framer Motion (Gestion des états scroll, hover et AnimatePresence).
- **Typographie** : Combinaison de *Inter* (Sans), *Cormorant Garamond* (Serif) et *Montserrat* (Display).

---

## 📦 Installation et Lancement

1. **Cloner le dépôt** :
   ```bash
   git clone [url-du-depot]
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Lancer en mode développement** :
   ```bash
   npm run dev
   ```

4. **Builder pour la production** :
   ```bash
   npm run build
   ```

---

## 🎨 Design System

| Élément | Couleur / Valeur |
| :--- | :--- |
| **Émeraude** | `#0F3D3E` (Sagesse & Profondeur) |
| **Or** | `#E2B850` (Prestige & Sacré) |
| **Sable** | `#FBF7F0` (Pureté & Calme) |
| **Ombres** | `shadow-sleek` (Profondeur subtile) |

---

## 📁 Structure du Projet

```text
src/
├── components/          # Composants UI modulaires
│   ├── Hero.tsx         # En-tête avec compte à rebours
│   ├── Offers.tsx       # Grille des forfaits
│   ├── Process.tsx      # Étapes du voyage
│   └── ...              # Autres sections (FAQ, Newsletter, etc.)
├── lib/                 # Utilitaires (cn, etc.)
├── App.tsx              # Point d'entrée principal
├── index.css            # Styles globaux & animations sur mesure
└── main.tsx             # Rendering React
```

---

## 📞 Support & Contact

Pour toute question relative au projet, veuillez contacter l'administrateur de l'agence via :
- **WhatsApp** : +227 89 50 24 85
- **Email** : contact@alhidaya.ne

---

*Réalisé avec excellence pour **AL-HIDAYA**.*
