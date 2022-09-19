# DateRangePicker
Un simple daterangepicker pour les développeurs javascript sans framework ni jquery (aucune dépendance).
Choisissez une période facilement pour l'affichage de vos statistiques, le choix de votre aller-retour pour votre voyage, etc.

<img width="406" alt="image" src="https://user-images.githubusercontent.com/50472875/191120097-47371105-6dfa-49d1-b696-fadb176e49fc.png">


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
const rangePicker = new DateRangePicker(selector, options)
```

DateRangePicker prend 2 arguments:

`selector` - une seule possibilités:
    `string` - un sélecteur CSS comme `'.my-class'`, `'#my-id'`, ou `'input'`.
    
`options` - un JSON pouvant contenir les clés suivantes:
* `start` - la date de début initiale choisie
* `end` - la date de fin initiale choisie
* `onchange` - un callback prenant au miminum deux arguments dont les 2 premiers arguments sont une date de début et une date de fin, qui est appelé à chaque fois qu'une période est choisie
    Exemple: 
    ```javascript
    const refreshStats = (start, end, data) => {
      // Instructions
    };
    ```
* `args` - les arguments à passer au callback à l'exception des deux premiers arguments qui sont fournis à l'intérieur de la classe DateRangePicker 

La valeur de retour du contructeur est une instance de DateRangePicker.

Vous devez utiliser DateRangePicker avec uniquement un élément `<input>`.

Exemple:
```javascript
const picker = new DateRangePicker('#daterange', {
    start: "2022-01-01",
    end: "2022-09-19",
    onchange: (start, end) => {
        document.querySelector('.periode-value').innerHTML = `
            Début: ${start} 
            <br/>
            Fin: ${end}
        `;
    },
    args: []
});
```

### Navigation Annee & Mois

En cliquant sur l'année ou le mois, une liste d'années sera affichée avec un élément `<input>` pour entrez rapidement une année
Après avoir choisi une année, la liste des mois sera affichée pour choisir un mois.
Ainsi le mois de l'année choisi sera affiché.

<img width="406" alt="image" src="https://user-images.githubusercontent.com/50472875/191120902-c98d3838-5430-473a-824b-7ffd8cbb8c10.png">

<img width="406" alt="image" src="https://user-images.githubusercontent.com/50472875/191121211-b378e09c-4d7b-4d68-b9ee-825c2e832a20.png">

<img width="406" alt="image" src="https://user-images.githubusercontent.com/50472875/191121586-2dfc26b4-9cb0-4b03-9a77-5e3b91deef80.png">


#### Methodes de classe

* getRange : retourne la période choisie sous format JSON avec les clés `start` et `end`
* getCallBackReturn: retourne la dernière valeur retournée par le callback passé en argument au constructeur de DateRangePicker dans les options. 



### Copyright 2022, Tafsir NDIOUR
