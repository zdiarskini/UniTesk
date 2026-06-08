let tarefas =
JSON.parse(localStorage.getItem("tarefas")) || [];


let arrastando;



function salvar(){

localStorage.setItem(
"tarefas",
JSON.stringify(tarefas)
);

}




function adicionar(){

let texto =
tarefaInput.value;


if(!texto)return;


tarefas.push({

id:Date.now(),

texto,

status:"fazer"

});


tarefaInput.value="";


salvar();

render();

}




function render(){


fazer.innerHTML="";
andamento.innerHTML="";
concluido.innerHTML="";



tarefas.forEach(t=>{


let div =
document.createElement("div");


div.className="tarefa";

div.draggable=true;


div.ondragstart=()=>{

arrastando=t.id;

};



div.innerHTML=

`
${t.texto}

<br>

<button onclick="excluir(${t.id})">
Excluir
</button>

`;



document
.getElementById(t.status)
.appendChild(div);


});



ativarDrop();

}





function ativarDrop(){


document
.querySelectorAll(".lista")
.forEach(lista=>{


lista.ondragover=e=>e.preventDefault();



lista.ondrop=()=>{


let tarefa =
tarefas.find(
t=>t.id==arrastando
);



tarefa.status =
lista.id;


salvar();

render();


};


});


}






function excluir(id){


tarefas =
tarefas.filter(
t=>t.id!=id
);


salvar();

render();

}



render();