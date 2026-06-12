let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];


function salvar(){
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}


function mostrar(){

    todo.innerHTML = "";
    doing.innerHTML = "";
    done.innerHTML = "";

    tarefas.forEach(tarefa => {

        let div = document.createElement("div");

        div.className = "task";
        div.draggable = true;

        div.innerHTML = `
        ${tarefa.texto}
        <span class="delete" onclick="excluir(${tarefa.id})">X</span>
        `;


        div.ondragstart = e => {
            e.dataTransfer.setData("id", tarefa.id);
        };


        document.getElementById(tarefa.status).appendChild(div);

    });

}



function addTask(){

    let campo = document.getElementById("task");

    if(campo.value == "") return;


    tarefas.push({

        id: Date.now(),

        texto: campo.value,

        status:"todo"

    });


    campo.value="";

    salvar();
    mostrar();

}




function allow(e){

    e.preventDefault();

}



function drop(e){

    let id = e.dataTransfer.getData("id");


    let tarefa = tarefas.find(t => t.id == id);


    tarefa.status = e.currentTarget.children[1].id;


    salvar();
    mostrar();

}




function excluir(id){

    tarefas = tarefas.filter(t => t.id != id);

    salvar();
    mostrar();

}



mostrar();