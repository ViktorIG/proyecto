const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'agenda',
});

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));

app.get('/obtener/paciente', (req, res) =>{
    const sqlSelect = "SELECT * FROM pacientes"
    db.query(sqlSelect, (err, result) => {
        console.log(err);
        res.send(result);
    })
})

app.get('/obtener/paciente/:nombreP', (req, res) =>{

    const nombre = req.params.nombreP;
    console.log(nombre);

    const sqlSelect = "SELECT * FROM pacientes WHERE nombre LIKE ?"
    db.query(sqlSelect, nombre, (err, result) => {
        console.log(nombre);
        console.log(err);
        res.send(result);
    })
})

app.get('/obtener/cita/:idP', (req, res) =>{

    const id = req.params.idP;
    console.log(id);
    console.log("zzzz");

    const sqlSelect = "SELECT nombre, apellidos FROM pacientes WHERE id = ?"
    db.query(sqlSelect, id, (err, result) => {
        console.log(id);
        console.log("aaa");
        console.log("aaa");
        console.log(result);
        res.send(result);
    })
})

app.get('/obtener/cita', (req, res) =>{
    const sqlSelect = "SELECT * FROM citas"
    db.query(sqlSelect, (err, result) => {
        console.log(err);
        res.send(result);
    })
})

app.post("/login", (req, res) => {
    
    const user = req.body.user;
    const pass = req.body.pass;

    const sqlLogin = "SELECT * FROM usuarios WHERE nombre = ? AND password = ?"
    db.query(sqlLogin, [user, pass], (err, result) => {
        console.log(err);
        if(err){
            res.send({err: err});
        }

        if(result.length > 0){
            res.send(result);
        }else{
            res.send({message: "Usuario o contraseña incorrectos!"});
        }
    })
})

app.post("/agregar/paciente", (req, res) =>{

    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const telefono = req.body.telefono;
    const telefono_cont = req.body.telefono_cont;
    const correo = req.body.correo;
    const direccion = req.body.direccion;
    const antecedentes = req.body.antecedentes;
    const padecimientos = req.body.padecimientos;
    const tratamiento = req.body.tratamiento;

    const sqlInsert = "INSERT INTO pacientes (nombre, apellidos, telefono, telefono_cont, correo, direccion, antecedentes, padecimientos, tratamiento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    db.query(sqlInsert, [nombre, apellidos, telefono, telefono_cont, correo, direccion, antecedentes, padecimientos, tratamiento], (err, result) => {
        console.log(err)
    })
})

app.post("/agregar/cita", (req, res) =>{
    const fecha = req.body.fecha;
    const hora = req.body.hora;
    const correo = req.body.correo;
    const descripcion = req.body.descripcion;
    const id = req.body.id;

    const sqlInsert = "INSERT INTO citas (correo_paciente, fecha, hora, descripcion, id_p) VALUES (?, ?, ?, ?, ?)"
    db.query(sqlInsert, [correo, fecha, hora, descripcion, id], (err, result) => {
        console.log(err)
    })
})

app.delete('/borrar/paciente/:id', (req, res) => {

    const id = req.params.id

    console.log(id)

    const sqlDelete = "DELETE FROM pacientes WHERE id = ?";
    db.query(sqlDelete, id, (err, result) => {
        if(err) console.log(err);
    })
})

app.delete('/borrar/cita/:id', (req, res) => {

    const id = req.params.id

    console.log(id)

    const sqlDelete = "DELETE FROM citas WHERE id = ?";
    db.query(sqlDelete, id, (err, result) => {
        if(err) console.log(err);
    })
})


app.listen(3001, () => {
    console.log("xd");
})