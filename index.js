const express = require("Express");
const Pool = require("pg").Pool;
const bodyParser = require('body-parser')
const methodOverride = require("method-override");
const app = express();
const port = 3000;
const pool = new Pool({
  user: "susanamunoz",
  host: "localhost",
  database: "vespertino",
  password: "",
  port: 5432,
});
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

app.delete("/usuarios", deleteUserByName);
app.delete("/usuarios2", deleteUserByName2);


app.get("/", (req, res) => send.render("index"));

function deleteUserByName(request, response) {
  const nombre = request.body.nombre;
  console.log(nombre)

 
  pool.query(
    "DELETE from usuario WHERE name like '%' || $1 || '%'",
    [nombre],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results.rowCount)
      response.status(200).send("Eliminado");
    }
  );
}

function deleteUserByName2(request, response) {
    const nombre = request.body.nombre;
    console.log(nombre)
  const query = "DELETE from usuario WHERE name ='"+nombre+"'"
   console.log(query)
    pool.query(
      query,
    
      (error, results) => {
        if (error) {
          throw error;
        }
        console.log(results.rowCount)
        response.status(200).send("Eliminado");
      }
    );
}
