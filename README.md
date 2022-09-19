# DateRangePicker
Un simple daterangepicker pour les développeurs javascript sans framework ni jquery (aucune dépendance).
Choisissez une période facilement pour l'affichage de vos statistiques, le choix de votre aller-retour pour votre voyage, etc.

<img width="387" alt="image" src="https://user-images.githubusercontent.com/50472875/190928776-d1e521f6-9213-48cd-a387-832e4832d624.png">


### Table of Contents

* [Installation](#installation)
* [Utilisation basique](#utilisation-basique)
* [Navigation Année & Mois](#navigation-annee--mois)
* [Methodes de classe](#methodes-de-classe)


## Installation

#### Manuellement

Inclure simplement `daterangepicker.css` dans le `<head>`...
```html
<head>
  ...
  <link rel="stylesheet" href="daterangepicker.css">
</head>
```

et inclure `daterangepicker.js` juste au dessus de la balise fermante `</body>` ...
```html
<body>
  ...
  <script src="daterangepicker.js"></script>
</body>
```

Si vous téléchargez le package via zip depuis Github, ces fichiers sont directement à la racine.


## Utilisation basique

Utilisation dans votre code:
```javascript
const rangePicker = new DateRangePicker(selector)
```

DateRangePicker prend 1 seul argument:

`selector` - une seule possibilités:
    `string` - un sélecteur CSS comme `'.my-class'`, `'#my-id'`, ou `'input'`.

La valeur de retour du contructeur est une instance de DateRangePicker.

Vous devez utiliser DateRangePicker avec uniquement un élément `<input>`.


### Navigation Annee & Mois

En cliquant sur l'année ou le mois, une liste d'années sera affichée avec un élément `<input>` pour entrez rapidement une année
Après avoir choisi une année, la liste des mois sera affichée pour choisir un mois.
Ainsi le mois de l'année choisi sera affiché.

![image](https://user-images.githubusercontent.com/50472875/190928852-4a1452b2-2547-463e-af9c-2b158778b488.png)

<img width="387" alt="image" src="https://user-images.githubusercontent.com/50472875/190928875-31d89a0c-5117-467a-ad1d-81b7164b170c.png">

<img width="387" alt="image" src="https://user-images.githubusercontent.com/50472875/190928924-e4600cf0-93ad-4e11-8009-c480564aaa3e.png">


#### Methodes de classe

* getRange : retourne la période choisie sous format JSON avec les clés `start` et `end`



Copyright 2022, Tafsir NDIOUR
