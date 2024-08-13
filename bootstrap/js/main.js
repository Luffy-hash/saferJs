// faire appelle aux element de mon html sous forme de variable
let form = document.getElementById("form");
let title = document.getElementById("title");
let date = document.getElementById("date");
let textarea = document.getElementById("textarea");
let task = document.getElementById("taches");
let add = document.getElementById("add");

// objet html des messages d'erreurs
let msgTitle =  document.getElementById("msgTitle");
// let msgDate = document.getElementById("msgDate");
// let msgDescription = document.getElementById("msgDescription");

// lorsqu'on clique sur le button valider
form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateForm();
});

// on valide le formulaire
let validateForm = () => {
    if (title.value === ""){
       msgTitle.innerHTML = "Ce champs est requis.";
       console.log("failure");
        
    }
    // else if (date.value < Date.now()) {
    //     msgDate.innerHTML = "Il faut une date du jour ou une date avancée"
    //     console.log("date");
    // }
    // else if (textarea.value === "") {
    //     msgDescription.innerHTML = "Ce champs est requis."
    // }
    else {
        msgTitle.innerHTML = "";

        acceptDate();
        add.setAttribute("data-bs-dismiss", "modal")
        add.click();
        (() => { add.setAttribute("data-bs-dismiss", "")})();

        showMessageFlash("Tâche créer avec succès")
    }
}

// données à enregistrer
let data = {};

let acceptDate = () => {
    data["text"] = title.value;
    data["date"] = date.value;
    data["description"] = textarea.value;

    createdTask();
}

// créer notre card d'affichage
let createdTask = () => {
    task.innerHTML += `
    <div class="card mt-3" style="width: auto;">
        <div class="card-body">
            <h5 class="card-title">${data.text}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${data.date}</h6>
            <p class="card-text">${data.description}</p>

            <span id ="original">
                <a href="#" onclick="deleteTask(this);" class="btn btn-danger btn-sm">
                    <i class="fa-sharp-duotone fa-solid fa-trash"></i>
                </a>
                
                 <a href="#" onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#editExampleModal" class="btn btn-primary  btn-sm">
                    <i class="fa-sharp-duotone fa-solid fa-pen-to-square"></i>
                </a>
                
            </span>

        </div>
    </div>`;

    resetForm();
}

// valeur courante de mes champs
let currentUpdateTitle = null;
let currentUpdateDate = null;
let currentUpdateTextarea = null;

// mise à jour de ma tache
let editTask = (e) => {
    
    let parentSelected = e.closest(".card-body");
    
    currentUpdateTitle = parentSelected.children[0].textContent;
    currentUpdateDate = parentSelected.children[1].textContent;
    currentUpdateTextarea = parentSelected.children[2].textContent;

    titleUpdate.value = parentSelected.children[0].innerHTML;
    dateUpdate.value = parentSelected.children[1].innerHTML;
    textareaUpdate.value = parentSelected.children[2].innerHTML;

}

let updateTask = (e) => {
    e.preventDefault();

    const updateTitle = document.getElementById("titleUpdate").value
    
    if (currentUpdateTitle){
        title.value = updateTitle;
        
    }

}

// suppresion de ma tache
let deleteTask = (e) => {
    
    let confimation = confirm("Êtes-vous sur de vouloir supprimer cette tâche ?");
    
    if (confimation) {
        let parentElementDiv = e.closest(".card");
        parentElementDiv.remove();

        showMessageFlash("Suppression reussi avec succès");
    }

    // e.parentElement.parentElement.parentElement.remove();
}

function showMessageFlash(message) {
    let flashMessage = document.getElementById("flashMessage");

    flashMessage.textContent = message;
    flashMessage.style.display = "block";

    setTimeout( () => {
        flashMessage.style.display = "none";
    }, 5000);
}
// vider le formulaire d'ajout de tâche
let resetForm = () => {
    title.value = "";
    date.value = "";
    textarea.value = "";
}

