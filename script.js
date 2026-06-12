let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];


function salvarTarefas(){

    localStorage.setItem("tarefas", JSON.stringify(tarefas));

}



function mostrarTarefas(){

    document.getElementById("todo").innerHTML = "";
    document.getElementById("doing").innerHTML = "";
    document.getElementById("done").innerHTML = "";


    for(let i = 0; i < tarefas.length; i++){

        let tarefa = tarefas[i];


        let div = document.createElement("div");

        div.className = "task";

        div.draggable = true;


        div.innerHTML = 
        tarefa.texto +
        " <span class='delete' onclick='excluir("+tarefa.id+")'>X</span>";


        div.ondragstart = function(event){

            event.dataTransfer.setData("id", tarefa.id);

        };


        document.getElementById(tarefa.status).appendChild(div);

    }

}




function adicionar(){

    let campo = document.getElementById("task");


    if(campo.value == ""){
        return;
    }


    let novaTarefa = {

        id: Date.now(),

        texto: campo.value,

        status:"todo"

    };


    tarefas.push(novaTarefa);


    campo.value = "";


    salvarTarefas();

    mostrarTarefas();

}





function permitirSoltar(event){

    event.preventDefault();

}





function soltar(event){


    let id = event.dataTransfer.getData("id");


    for(let i = 0; i < tarefas.length; i++){


        if(tarefas[i].id == id){


            tarefas[i].status =
            event.currentTarget.id;


        }

    }


    salvarTarefas();

    mostrarTarefas();

}





function excluir(id){


    let novaLista = [];


    for(let i = 0; i < tarefas.length; i++){


        if(tarefas[i].id != id){

            novaLista.push(tarefas[i]);

        }

    }


    tarefas = novaLista;


    salvarTarefas();

    mostrarTarefas();

}



mostrarTarefas();