# backend
Mettre les informations pour les variables d'environnement (base de données MongoDB Atlas)

Pour lancer le serveur : `$ npm run start`

# Route
## Pour créer un compte (POST)
http://localhost:3000/api/auth/signup

Body-->raw :
{
    "email": "xxxxxx",
    "password": "xxxxxx"(password fort)
}

## Pour se logger (POST)
http://localhost:3000/api/auth/login

Body-->raw :
{
    "email": "xxxxxx",
    "password": "xxxxxx"(password fort)
}

# Toutes ces routes nécessitent un token d'authentification
## Pour créer la fiche sauce (POST)
http://localhost:3000/api/sauces/

Params--> KEY: userId VALUE: _id de user
Authorization--> Bearer Token Token: "xxxxxx"
Body-->form-data-->
    KEY: ficheSauce
    VALUE:
        {
            "userId": "xxxxxx",
            "name": "xxxxxx",
            "manufacturer": "xxxxxx",
            "description": "xxxxxx",
            "mainPepper": "xxxxxx",
            "imageUrl": "",
            "heat": 0
        }
    KEY: image
    file et sélectionner l'image

## Pour afficher tous les fiches sauces (GET)
http://localhost:3000/api/sauces/

Authorization--> Bearer Token Token: "xxxxxx"
Body-->raw :
{
    "userId": "xxxxxx"
}

## Pour afficher une fiche sauce (GET)
http://localhost:3000/api/sauces/:id

Authorization--> Bearer Token Token: "xxxxxx"
Params--> KEY: userId VALUE: _id de user
Body-->none

## Pour modifier une fiche sauce (PUT)
http://localhost:3000/api/sauces/:id

Params--> KEY: userId VALUE: _id de user
Authorization--> Bearer Token Token: "xxxxxx"
Body-->form-data-->
    KEY: ficheSauce
    VALUE:
        {
            "userId": "xxxxxx",
            "name": "xxxxxx",
            "manufacturer": "xxxxxx",
            "description": "xxxxxx",
            "mainPepper": "xxxxxx",
            "imageUrl": "",
            "heat": 0
        }
    KEY: image
    file et sélectionner l'image

## Pour supprimer une fiche sauce (DELETE)
http://localhost:3000/api/sauces/:id

Params--> KEY: userId VALUE: _id de user