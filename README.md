# Leaflet North Arrow Plugin

Un plugin Leaflet pour ajouter une flèche nord personnalisable à vos cartes. Ce plugin offre plusieurs styles de flèches nord avec des options de personnalisation avancées.

## Fonctionnalités

- **9 styles de flèches nord différents**: classic, modern, artistic, atlas, circular, triangular, letterN, minimalist, compassStar
- **Personnalisation complète**: taille, couleur, opacité, position
- **Rotation interactive**: option de rotation au clic
- **Support AMD/CommonJS**: compatible avec les modules JavaScript
- **Léger et performant**: aucune dépendance externe
- **Facile à intégrer**: installation simple avec Leaflet

## Installation

### Via CDN

Ajoutez simplement les fichiers CSS et JS à votre page HTML:

```html
<link rel="stylesheet" href="leaflet-north-arrow.css" />
<script src="leaflet-north-arrow.js"></script>
```

### Via npm

```bash
npm install leaflet-north-arrow
```

## Utilisation

### Exemple basique

```javascript
const map = L.map('map').setView([48.8566, 2.3522], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Ajouter la flèche nord
L.northArrow({
    map: map,
    position: 'topright',
    style: 'classic',
    size: 80,
    color: '#2c3e50'
});
```

### Options disponibles

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `map` | Object | - | Instance de la carte Leaflet |
| `position` | String | `'topright'` | Position: `'topleft'`, `'topright'`, `'bottomleft'`, `'bottomright'` |
| `style` | String | `'classic'` | Style de la flèche: voir liste ci-dessous |
| `size` | Number | `80` | Taille en pixels |
| `color` | String | `'#2c3e50'` | Couleur de la flèche (code hexadécimal) |
| `opacity` | Number | `1` | Opacité entre 0 et 1 |
| `tooltip` | String | `'Nord'` | Texte du tooltip au survol |
| `clickToRotate` | Boolean | `false` | Active la rotation au clic |
| `showCompass` | Boolean | `false` | Affiche la lettre N |
| `className` | String | `''` | Classe CSS additionnelle |
| `onRotate` | Function | - | Callback appelé lors de la rotation |

### Styles disponibles

- `classic` - Style classique cartographique
- `modern` - Style moderne minimaliste
- `artistic` - Style artistique ornemental
- `atlas` - Style type atlas
- `circular` - Style circulaire
- `triangular` - Style triangulaire
- `letterN` - Style avec lettre N intégrée
- `minimalist` - Style minimaliste
- `compassStar` - Style étoile/boussole

### Méthodes API

```javascript
const northArrow = L.northArrow({ map: map, style: 'classic' });

// Changer le style
northArrow.setStyle('modern');

// Changer la taille
northArrow.setSize(100);

// Changer la couleur
northArrow.setColor('#e74c3c');

// Changer l'opacité
northArrow.setOpacity(0.8);

// Changer le tooltip
northArrow.setTooltip('Direction Nord');

// Obtenir le conteneur DOM
const container = northArrow.getContainer();
```

### Exemple avec rotation interactive

```javascript
L.northArrow({
    map: map,
    style: 'compassStar',
    size: 100,
    color: '#3498db',
    clickToRotate: true,
    tooltip: 'Cliquez pour rotation',
    onRotate: (angle) => {
        console.log('Angle de rotation:', angle);
    }
});
```

## Démonstration

Ouvrez le fichier `demo.html` dans votre navigateur pour voir une démonstration interactive avec tous les styles et options disponibles.

## Compatibilité

- Leaflet 1.0+
- Tous les navigateurs modernes (Chrome, Firefox, Safari, Edge)
- Mobile et desktop

## Licence

MIT License - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à:
- Signaler des bugs
- Proposer de nouvelles fonctionnalités
- Soumettre des pull requests
- Améliorer la documentation

## Auteur

Créé pour la communauté Leaflet.

## Liens

- [Leaflet](https://leafletjs.com/)
- [Documentation Leaflet](https://leafletjs.com/reference.html)
