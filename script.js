const API =
"http://localhost:5500/eventos";

// cadastrar evento

async function salvarEvento(){

    const nome =
    document.getElementById("nome").value;

    const descricao =
    document.getElementById("descricao").value;

    const local =
    document.getElementById("local").value;

    const data =
    document.getElementById("data").value;

    if(
        nome.trim() === "" ||
        descricao.trim() === "" ||
        local.trim() === "" ||
        data.trim() === ""
    ){
        alert("Preencha todos os campos");
        return;
    }

    const resposta = await fetch(API,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            nome,
            descricao,
            local,
            data

        })

    });

    console.log(await resposta.json());

}

// listar eventos

async function listarEventos(){

    const res =
    await fetch(API);

    const eventos =
    await res.json();

    let html = "";

    eventos.forEach(evento => {

        html += `

    <div class="card">

        <h3>${evento.nome}</h3>

        <p>${evento.descricao}</p>

        <p>${evento.local}</p>

        <p>${evento.data}</p>

        <button
            onclick="excluirEvento(${evento.id})"
        >
            Excluir
        </button>

    </div>

`});

    document
    .getElementById("resultado")
    .innerHTML = html;

};

// excluir evento

async function excluirEvento(id){

    await fetch(

        `${API}/${id}`,

        {
            method:"DELETE"
        }

    );

    listarEventos();

};