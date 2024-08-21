// stock my task
let tasks = [];
let updateIndex = -1;


// faire appelle aux element de mon html sous forme de variable
let addForm = document.getElementById("addForm");
let updateForm = document.getElementById("updateForm");
let modal = document.getElementById("closeModal");
let taskList = document.getElementById("taskList");

// objet html des messages d'erreurs
let msgTitle =  document.getElementById("msgTitle");
let msgUpdateTitle = document.getElementById("msgUpdateTitle");

// let msgDate = document.getElementById("msgDate");
// let msgDescription = document.getElementById("msgDescription");

//charger le local storage
window.onload = () => {
    const stocakLocalStorage = localStorage.getItem('tasks');
    if (stocakLocalStorage) { tasks = JSON.parse(stocakLocalStorage);}

    displayTask();
}

// lorsqu'on clique sur le button ajouter pour ajouter une tâche
addForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const textarea = document.getElementById("textarea").value;
    
    if (title.value === ""){
        msgTitle.innerHTML = "Ce champs est requis.";
    }
    else {
        
        tasks.push({title, date, textarea});
        saveTaskLocalStorage();
       
        closeModal();

        showMessageFlash("La tâche a été rajouté avec succès");
        document.getElementById("addForm").reset();

        displayTask();
    }

});

// lorsqu'on veut faire une mise à jour
updateForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const title = document.getElementById("titleUpdate").value;
    const date = document.getElementById("dateUpdate").value;
    const textarea = document.getElementById("textareaUpdate").value;

    if (title.value === "") {

    }
    else {
      
        tasks[updateIndex] = {title, date, textarea};
        saveTaskLocalStorage();

        document.getElementById("updatecloseModal").setAttribute("data-bs-dismiss", "modal")
        document.getElementById("updatecloseModal").click();
        (() => { document.getElementById("updatecloseModal").setAttribute("data-bs-dismiss", "")})();
        
        showMessageFlash("mise à jour reussi avec succès");
        document.getElementById("updateForm").reset();

        updateIndex = -1; // reinitialise l'index de mise à jour

       displayTask();
    }

});

// affiche la liste des tâches
let displayTask = () => {

    const taskList = document.getElementById("taskList");
    const searchTask = document.getElementById("searchTask").value.toLowerCase();
    taskList.innerHTML = "";

    tasks
    .filter((task) => task.title.toLowerCase().includes(searchTask))
    .forEach((task, index) => {

        const taskNewHtmlDiv = document.createElement("div", {is : "card mt-3"});
        taskNewHtmlDiv.innerHTML = `
            <a class="card-body" href="/singleView/singleTashView.html">
                <h5 class="card-title">${task.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${task.date}</h6>
                <p class="card-text">
                    ${task.textarea}
                    
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="completTaskCheckbox">
                        <label class="form-check-label" for="flexCheckDefault">
                            tâche complète
                        </label>
                    </div>
                </p>


                <span id ="original">
                    <a href="#" onclick="editTask(${index})" data-bs-toggle="modal" data-bs-target="#editExampleModal" class="btn btn-primary  btn-sm">
                        <i class="fa-sharp-duotone fa-solid fa-pen-to-square"></i>
                    </a>

                    <a href="#" onclick="deleteTask(${index});" class="btn btn-danger btn-sm">
                        <i class="fa-sharp-duotone fa-solid fa-trash"></i>
                    </a>
                    
                    
                </span>

            </a>`;

        taskList.appendChild(taskNewHtmlDiv);
        
    });

}

let singleTashView = (index) => {

    console.log("My single page");
    return index;

}

// mise à jour de ma tache
let editTask = (index) => {

    const task = tasks[index];

    document.getElementById("titleUpdate").value = task.title;
    document.getElementById("dateUpdate").value = task.date;
    document.getElementById("textareaUpdate").value = task.textarea;

    updateIndex = index;
    
}

// suppresion de ma tache
let deleteTask = (index) => {
    
    const confimation = confirm("Êtes-vous sur de vouloir supprimer cette tâche ?");
    
    if (confimation) {
        tasks.splice(index, 1);
        saveTaskLocalStorage();
        displayTask();
        showMessageFlash("Suppression reussi avec succès");
    }

}

function showMessageFlash(message) {
    let flashMessage = document.getElementById("flashMessage");

    flashMessage.textContent = message;
    flashMessage.style.display = "block";

    setTimeout( () => {
        flashMessage.style.display = "none";
    }, 5000);
}

let closeModal = () => {
    modal.setAttribute("data-bs-dismiss", "modal")
    modal.click();
    (() => { modal.setAttribute("data-bs-dismiss", "")})();
}

// sauvegarder mes tâches dans le local Storage
let saveTaskLocalStorage = () => {
    localStorage.setItem('task', JSON.stringify(tasks));
}

document.getElementById("searchTask").addEventListener("input", displayTask);
