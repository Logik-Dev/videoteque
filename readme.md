# <center>Vidéothèque</center>

## L'application

C'est un simple site web qui propose à un utilisateur de rechecher un film et de l'ajouter soit dans ses favoris, soit dans une liste de films à voir.Les listes de films contiennent l'affiche du film, son résumé, sa note sur IMDB, ainsi que des icones définissant le statut du film pour l'utilisateur: favoris et/ou à voir.
La barre de navigation contient trois liens:

- __*Recherche*__ affiche le résultat de la recherche.
- __*Mes favoris*__ affiche la liste des films ajoutés aux favoris.
- __*Films à voir*__ affiche la liste des films que l'utilisateur souhaite voir.  

--- 

## Arhchitecture
![Architecture](./images/diagramme.png)

---

## API

Le backend propose plusieurs __endpoints__ remplissant le contrat __CRUD__:

*CREATE*

- ```/api/movies/add```

*READ*

- ```/api/movies/find```
- ```/api/movies/favorite/all```
- ```/api/movies/wanted/all```

*UPDATE*

- ```/api/movies/update```

*DELETE*

- ```/api/movies/delete```

---

## Aperçu d'une recherche

![Application](./images/app.png)

---