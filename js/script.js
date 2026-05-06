let user = localStorage.getItem("user");

if(!user){
    window.location.href="login.html";
}

document.getElementById("welcome").innerText = "Welcome " + user;

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveData(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(){

    let task = document.getElementById("taskInput").value;

    if(task==""){
        alert("Enter Task");
        return;
    }

    tasks.push({
        name:task,
        done:false
    });

    saveData();
    showTasks();

    document.getElementById("taskInput").value="";
}

function showTasks(){

    let pending = document.getElementById("pendingList");
    let complete = document.getElementById("completedList");

    pending.innerHTML="";
    complete.innerHTML="";

    tasks.forEach((item,index)=>{

        let row = `
        <li>
        ${item.name}
        <div>
        <button onclick="toggleTask(${index})">✓</button>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
        </div>
        </li>
        `;

        if(item.done){
            complete.innerHTML += row;
        }else{
            pending.innerHTML += row;
        }

    });
}

function toggleTask(index){
    tasks[index].done = !tasks[index].done;
    saveData();
    showTasks();
}

function editTask(index){
    let newTask = prompt("Edit Task", tasks[index].name);

    if(newTask){
        tasks[index].name = newTask;
        saveData();
        showTasks();
    }
}

function deleteTask(index){
    tasks.splice(index,1);
    saveData();
    showTasks();
}

function logout(){
    localStorage.removeItem("user");
    window.location.href="login.html";
}

showTasks();