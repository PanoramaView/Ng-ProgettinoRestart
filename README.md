npm install --force 

ng serve
imported bootstrap in angular.json:
"styles": [
              "node_modules/bootstrap/dist/css/bootstrap.min.css",
              "src/styles.css"
            ],
            "scripts": [
              "node_modules/bootstrap/dist/js/bootstrap.js"
            ]


/homepage: lista di post
post: titolo, descrizione, autore, #n commenti(nome, testo)

Homepage/post:
List dei commenti

/create
Titolo, testo, autore

API

GET https://spindox-blog.herokuapp.com/api/posts

GET https://spindox-blog.herokuapp.com/api/posts/:id //in post-detail

POST https://spindox-blog.herokuapp.com/api/posts

PUT https://spindox-blog.herokuapp.com/api/posts/:id

DELETE https://spindox-blog.herokuapp.com/api/posts/:id



- in editMode @refresh, no data
- edit post
- tags 
- comments format
