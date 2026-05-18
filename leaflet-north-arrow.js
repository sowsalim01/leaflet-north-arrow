/* leaflet-north-arrow.js - Plugin North Arrow pour Leaflet */

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['leaflet'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('leaflet'));
    } else {
        factory(L);
    }
}(function(L) {

    // Vérification de l'existence de Leaflet
    if (!L) {
        throw new Error('Leaflet must be loaded before using the North Arrow plugin');
    }

    // Définition des modèles de flèches nord (SVG)
    const NORTH_ARROW_STYLES = {
        // Style classique cartographique
        classic: {
            svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,10 35,45 50,35 65,45" fill="currentColor" stroke="currentColor" stroke-width="2"/>
                <polygon points="50,90 35,55 50,65 65,55" fill="currentColor" stroke="currentColor" stroke-width="2"/>
                <polygon points="50,10 45,45 50,40 55,45" fill="white"/>
                <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" stroke-width="2"/>
            </svg>`,
            letter: 'N'
        },
        
        // Style moderne minimaliste
        modern: {
            svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,10 30,55 50,40 70,55" fill="currentColor"/>
                <polygon points="50,90 30,45 50,60 70,45" fill="currentColor" opacity="0.4"/>
                <circle cx="50" cy="50" r="8" fill="currentColor"/>
            </svg>`,
            letter: ''
        },
        
        // Style artistique / ornemental
        artistic: {
            svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="artisticGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="currentColor"/>
                        <stop offset="100%" stop-color="currentColor" stop-opacity="0.5"/>
                    </linearGradient>
                </defs>
                <path d="M50,5 L35,40 L50,30 L65,40 Z" fill="url(#artisticGrad)"/>
                <path d="M50,95 L35,60 L50,70 L65,60 Z" fill="currentColor" opacity="0.3"/>
                <circle cx="50" cy="50" r="12" fill="none" stroke="currentColor" stroke-width="2"/>
                <circle cx="50" cy="50" r="5" fill="currentColor"/>
            </svg>`,
            letter: 'N'
        },
        
        // Style type atlas
        atlas: {
            svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,8 32,50 50,42 68,50" fill="currentColor"/>
                <polygon points="50,92 32,50 50,58 68,50" fill="currentColor" opacity="0.5"/>
                <circle cx="50" cy="50" r="18" fill="none" stroke="currentColor" stroke-width="1.5"/>
                <text x="50" y="85" text-anchor="middle" font-size="14" font-family="Georgia, serif" fill="currentColor">N</text>
            </svg>`,
            letter: ''
        },
        
        // Style circulaire
        circular: {
            svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="2"/>
                <polygon points="50,12 38,50 50,42 62,50" fill="currentColor"/>
                <polygon points="50,88 38,50 50,58 62,50" fill="currentColor" opacity="0.3"/>
                <circle cx="50" cy="50" r="4" fill="currentColor"/>
            </svg>`,
            letter: 'N'
        },
        
        // Style triangulaire
        triangular: {
            svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,10 25,55 50,40 75,55" fill="currentColor"/>
                <polygon points="50,90 25,45 50,60 75,45" fill="currentColor" opacity="0.3"/>
                <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4,4"/>
            </svg>`,
            letter: ''
        },
        
        // Style avec lettre N intégrée
        letterN: {
            svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,12 30,45 50,35 70,45" fill="currentColor"/>
                <rect x="38" y="48" width="24" height="32" rx="3" fill="currentColor" opacity="0.8"/>
                <text x="50" y="72" text-anchor="middle" font-size="20" font-family="Arial, sans-serif" font-weight="bold" fill="white">N</text>
            </svg>`,
            letter: ''
        },
        
        // Style minimaliste
        minimalist: {
            svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,15 40,50 50,45 60,50" fill="currentColor"/>
                <line x1="50" y1="15" x2="50" y2="85" stroke="currentColor" stroke-width="2"/>
                <circle cx="50" cy="85" r="3" fill="currentColor"/>
            </svg>`,
            letter: 'N'
        },
        
        // Style étoile / boussole
        compassStar: {
            svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,8 42,42 50,35 58,42" fill="currentColor"/>
                <polygon points="50,92 42,58 50,65 58,58" fill="currentColor" opacity="0.4"/>
                <polygon points="8,50 42,42 35,50 42,58" fill="currentColor" opacity="0.3"/>
                <polygon points="92,50 58,42 65,50 58,58" fill="currentColor" opacity="0.3"/>
                <circle cx="50" cy="50" r="6" fill="currentColor"/>
                <text x="50" y="95" text-anchor="middle" font-size="10" font-family="Arial, sans-serif" fill="currentColor" font-weight="bold">N</text>
            </svg>`,
            letter: ''
        }
    };

    // Styles par défaut
    const DEFAULT_OPTIONS = {
        position: 'topright',
        style: 'classic',
        size: 80,
        color: '#2c3e50',
        opacity: 1,
        tooltip: 'Nord',
        clickToRotate: false,
        showCompass: false,
        className: ''
    };

    // Classe du contrôle North Arrow
    const NorthArrowControl = L.Control.extend({
        options: {
            position: DEFAULT_OPTIONS.position
        },

        initialize: function(options) {
            L.setOptions(this, options);
            this._options = { ...DEFAULT_OPTIONS, ...options };
            this._currentRotation = 0;
        },

        onAdd: function(map) {
            this._map = map;
            this._container = L.DomUtil.create('div', 'leaflet-north-arrow-control');
            
            if (this._options.className) {
                L.DomUtil.addClass(this._container, this._options.className);
            }
            
            // Appliquer taille et opacité
            this._container.style.width = `${this._options.size}px`;
            this._container.style.height = `${this._options.size}px`;
            this._container.style.opacity = this._options.opacity;
            
            // Créer le conteneur SVG
            this._svgContainer = L.DomUtil.create('div', 'leaflet-north-arrow-svg-container', this._container);
            
            // Mettre à jour l'affichage
            this._updateArrow();
            
            // Ajouter l'événement de clic (optionnel)
            if (this._options.clickToRotate) {
                L.DomEvent.on(this._container, 'click', this._onClick, this);
            }
            
            // Empêcher les événements de clic de passer à la carte
            L.DomEvent.disableClickPropagation(this._container);
            
            return this._container;
        },

        _updateArrow: function() {
            const style = NORTH_ARROW_STYLES[this._options.style];
            if (!style) {
                console.warn(`Style "${this._options.style}" non trouvé, utilisation du style "classic"`);
                return this._updateArrowWithStyle(NORTH_ARROW_STYLES.classic);
            }
            this._updateArrowWithStyle(style);
        },

        _updateArrowWithStyle: function(style) {
            // Remplacer la couleur dans le SVG
            let svgHtml = style.svg.replace(/currentColor/g, this._options.color);
            
            // Ajouter la lettre N si nécessaire
            if (style.letter && this._options.showCompass !== false) {
                // Ajouter un texte N au centre ou en bas selon le style
                if (!svgHtml.includes('N</text>')) {
                    svgHtml = svgHtml.replace('</svg>', `<text x="50" y="92" text-anchor="middle" font-size="${
                        this._options.size > 60 ? '14' : '10'
                    }" font-family="Arial, sans-serif" font-weight="bold" fill="${this._options.color}">N</text></svg>`);
                }
            }
            
            this._svgContainer.innerHTML = svgHtml;
            
            // Appliquer la rotation si nécessaire
            if (this._currentRotation !== 0) {
                this._svgContainer.style.transform = `rotate(${this._currentRotation}deg)`;
            }
            
            // Ajouter tooltip
            if (this._options.tooltip) {
                this._container.title = this._options.tooltip;
            }
        },

        _onClick: function() {
            // Animation pulse
            L.DomUtil.addClass(this._container, 'leaflet-north-arrow-pulse');
            setTimeout(() => {
                L.DomUtil.removeClass(this._container, 'leaflet-north-arrow-pulse');
            }, 300);
            
            // Rotation de 360 degrés
            this._currentRotation = (this._currentRotation + 360) % 360;
            this._svgContainer.style.transform = `rotate(${this._currentRotation}deg)`;
            
            if (this._options.onRotate) {
                this._options.onRotate(this._currentRotation);
            }
        },

        setStyle: function(styleName) {
            if (NORTH_ARROW_STYLES[styleName]) {
                this._options.style = styleName;
                this._updateArrow();
            }
            return this;
        },

        setSize: function(size) {
            this._options.size = size;
            this._container.style.width = `${size}px`;
            this._container.style.height = `${size}px`;
            this._updateArrow();
            return this;
        },

        setColor: function(color) {
            this._options.color = color;
            this._updateArrow();
            return this;
        },

        setOpacity: function(opacity) {
            this._options.opacity = opacity;
            this._container.style.opacity = opacity;
            return this;
        },

        setTooltip: function(tooltip) {
            this._options.tooltip = tooltip;
            this._container.title = tooltip;
            return this;
        },

        getContainer: function() {
            return this._container;
        }
    });

    // Fonction factory pour créer la flèche nord
    L.northArrow = function(options) {
        // Extraire map des options
        const map = options.map;
        delete options.map;
        
        const control = new NorthArrowControl(options);
        
        if (map) {
            control.addTo(map);
        }
        
        return control;
    };

    // Exporter les styles disponibles
    L.northArrow.styles = Object.keys(NORTH_ARROW_STYLES);
    
    // Méthode utilitaire pour prévisualiser les styles
    L.northArrow.previewStyle = function(styleName, container, options = {}) {
        const style = NORTH_ARROW_STYLES[styleName];
        if (!style) return null;
        
        const div = document.createElement('div');
        div.style.width = `${options.size || 80}px`;
        div.style.height = `${options.size || 80}px`;
        div.style.color = options.color || '#2c3e50';
        div.innerHTML = style.svg.replace(/currentColor/g, div.style.color);
        
        if (container) {
            container.appendChild(div);
        }
        
        return div;
    };

    return L.northArrow;
}));