Edpoints

Se ejecuta en: http://localhost:3000

Donde existen las rutas de Items, Categories, y Users

user 

login

get/users/:id

get user/me

ITEM

POST --> /items ------------------------Creacion de un item------------------------------

headers Authirization Bearer:


    {
        "_id": "66512a52b53b89ee40986a06",
        "name": "Cepillo de cabello",
        "description": "color negro",
        "price": 20,
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZF61nkE33TO5QDRQo8YD32yIQJXFMNIn4ZFcA0hfoBA&s",
        "stock": 50,
        "isActive": true,
        "createdAt": "2024-05-25T00:01:22.773Z",
        "updatedAt": "2024-05-25T00:01:22.773Z",
        "__v": 0,
        "category_name": "Belleza y Cuidado Personal"
    }

Debe haberse iniciado sesión y enviar el token en la cabecera de la petición para que pueda ser creado un producto.

GETALLITEMS

GET ---> /items ------------------------Listado de todos los items------------------------------

GETONEITEM

GET ---> /items/:id ------------------------Devuelve un solo item de acuerdo al id proporcionado------------------------------


Para poder crear order tendras que tomar en cuenta en que el CartId existe en la base de datos. Ejemplo de peticion:

POST ---> /orders ------------------------

{
  "cartId": "60c72b1f9f1b2c001cf0e9f8", 
  "total": 100
}

        Respuesta de la peticion :
        {
             "_id": "60c72c1f9f1b2c001cf0e9f9",
             "cart_id": "60c72b1f9f1b2c001cf0e9f8",
            "total": 100,
            "isActive": true,
            "createdAt": "2021-06-14T08:29:19.351Z",
            "updatedAt": "2021-06-14T08:29:19.351Z",
            "__v": 0
        }

GETALLORDERS ---> /orders ------------------------

    Método: GET

De esta manera tendria que verse la respusta de la petición:

[
  {
    "_id": "60c72c1f9f1b2c001cf0e9f9",
    "cart_id": {
      "_id": "60c72b1f9f1b2c001cf0e9f8",
      "user_id": "60c72b1f9f1b2c001cf0e9f7",
      "item_id": "60c72b1f9f1b2c001cf0e9f6",
      "quantity": 2,
      "unitPrice": 50,
      "sumTotal": 100,
      "isActive": true,
      "__v": 0
    },
    "total": 100,
    "isActive": true,
    "createdAt": "2021-06-14T08:29:19.351Z",
    "updatedAt": "2021-06-14T08:29:19.351Z",
    "__v": 0
  },
  {
    "_id": "60c72d1f9f1b2c001cf0e9fa",
    "cart_id": {
      "_id": "60c72d1f9f1b2c001cf0e9f8",
      "user_id": "60c72d1f9f1b2c001cf0e9f7",
      "item_id": "60c72d1f9f1b2c001cf0e9f6",
      "quantity": 1,
      "unitPrice": 100,
      "sumTotal": 100,
      "isActive": true,
      "__v": 0
    },
    "total": 100,
    "isActive": true,
    "createdAt": "2021-06-14T08:30:19.351Z",
    "updatedAt": "2021-06-14T08:30:19.351Z",
    "__v": 0
  }
]




GETORDERBYID ---> /orders/:id ------------------------

    La respuesta de la peticion seria:

    {
        "_id": "60c72c1f9f1b2c001cf0e9f9",
        "cart_id": {
        "_id": "60c72b1f9f1b2c001cf0e9f8",
        "user_id": "60c72b1f9f1b2c001cf0e9f7",
        "item_id": "60c72b1f9f1b2c001cf0e9f6",
        "quantity": 2,
        "unitPrice": 50,
        "sumTotal": 100,
        "isActive": true,
        "__v": 0
    },
        "total": 100,
        "isActive": true,
        "createdAt": "2021-06-14T08:29:19.351Z",
        "updatedAt": "2021-06-14T08:29:19.351Z",
        "__v": 0
    }


USER

REGISTER

POST ---> /register ------------------------Registrar un usuario------------------------------

    {
        "email": "example@gmail.com",
        "password": "examplepwd",
        "name": "John",
        "last_name": "Doe",
        "role": ADMIN,
        "isActive": true,
    }
Formato para registrar a un usuario

POST ---> /login ------------------------Inicio de sesión------------------------------

    {
        "email": "example@gmail.com",
        "password": "examplepwd"
    }

GET ---> /users ------------------------Obtener lista de todos los usuarios registrados------------------------------

Debe haberse iniciado sesión como ADMIN y enviar el token en la cabecera de la petición para obtener la lista

GET ---> /clients ------------------------Obtener lista de todos los usuarios registrados como clientes------------------------------

Debe haberse iniciado sesión como ADMIN y enviar el token en la cabecera de la petición para obtener la lista





