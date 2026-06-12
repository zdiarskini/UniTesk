let tasks=JSON.parse(localStorage.getItem("tasks"))||[];

function save(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}

function show(){

["todo","doing","done"].forEach(x=>{
document.getElementById(x).innerHTML="";
});

tasks.forEach(t=>{

let d=document.createElement("div");

d.className="task";
d.draggable=true;
d.id=t.id;

d.innerHTML=
t.text+
` <span class="delete" onclick="del(${t.id})">X</span>`;

d.ondragstart=e=>e.dataTransfer.setData("id",t.id);

document.getElementById(t.status).appendChild(d);

});

}


function addTask(){

let input=document.getElementById("task");

if(!input.value)return;

tasks.push({
id:Date.now(),
text:input.value,
status:"todo"
});

input.value="";

save();
show();

}


function drop(e){

let id=e.dataTransfer.getData("id");

let task=tasks.find(x=>x.id==id);

task.status=e.currentTarget.children[1].id;

save();
show();

}


function allow(e){
e.preventDefault();
}


function del(id){

tasks=tasks.filter(x=>x.id!=id);

save();
show();

}


show();