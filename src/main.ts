import express from "express";
import cors from "cors"


const app = express();
app.use(express.json())
app.use(cors())
let idContato = 1

type Usuario = {
    id: Number,
    nome: String;
    email: String;
}

const usuarios: Usuario[] = [];


app.post('/user', (req, res) => {
    const { nome, email } = req.body

    const novoUsuario: Usuario =
    {
        id: Number(idContato++),
        nome,
        email
    }
    usuarios.push(novoUsuario)
    res.json("requisição Enviada")
})

app.get('/user', (req, res) => {
    res.json(usuarios)
})

app.put('/user/:id', (req, res) => {
    const { nome, email } = req.body
    const idUser: number = Number(req.params.id)

    const filterPeloId = usuarios.find(array => array.id == idUser);

    if (filterPeloId) {
        filterPeloId.nome = nome
        filterPeloId.email = email

    } else if (isNaN(idUser)) {
        res.status(400).json({ erro: "requisição invalida" })
    }

    res.json("dados Atualizando")
})

app.delete('/user/:id', (req, res) => {
    const idDelete: number = Number(req.params.id)
    const filterPeloId = usuarios.findIndex(list => list.id == idDelete)

    
    if (isNaN(idDelete)) {
      res.status(400).json("Você deve passar um número válido");
    } else if (idDelete <= 0) {
      res.status(400).json("O ID deve ser maior que 0");
    } else if (filterPeloId === -1) {
      res.status(404).json("Usuário não encontrado");
    } else {
      usuarios.splice(filterPeloId, 1);
      res.json("Removido");
    }
    

})

app.listen(8089, () => {
    console.log('Servidor Aberto')
})