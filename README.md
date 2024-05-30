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





