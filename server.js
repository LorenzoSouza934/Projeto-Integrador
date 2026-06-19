const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// conexão

const db = new sqlite3.Database(
    path.join(__dirname, "banco.db")
);

// tabela

db.run(`
CREATE TABLE IF NOT EXISTS eventos (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    nome TEXT,

    descricao TEXT,

    local TEXT,

    data TEXT

)
`);

// listar eventos

app.get("/eventos", (req,res) => {

    db.all(

        "SELECT * FROM eventos",

        [],

        (err,rows) => {

            if(err){

                return res.status(500).json({
                    erro:err.message
                });

            }

            res.json(rows);

        }

    );

});

// cadastrar evento

app.post("/eventos", (req,res) => {

    const {

        nome,
        descricao,
        local,
        data

    } = req.body;

    db.run(

        `INSERT INTO eventos
        (nome, descricao, local, data)
        VALUES (?, ?, ?, ?)`,

        [

            nome,
            descricao,
            local,
            data

        ],

        function(err){

            if(err){

                return res.status(500).json({
                    erro:err.message
                });

            }

            res.json({

                mensagem:"Evento cadastrado",

                id:this.lastID

            });

        }

    );

});

// excluir evento

app.delete("/eventos/:id", (req,res) => {

    const id = req.params.id;

    db.run(

        "DELETE FROM eventos WHERE id = ?",

        [id],

        function(err){

            if(err){

                return res.status(500).json({
                    erro:err.message
                });

            }

            res.json({
                mensagem:"Evento excluído"
            });

        }

    );

});

// servidor

app.listen(5500, () => {

    console.log(
    "InfoTickets iniciado na porta 5500"
    );

});

console.log(
    "DB PATH:",
    path.join(__dirname, "banco.db")
);