//Code + explication des procédures sur chaque section du code 
// Sélection des éléments HTML
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Charger les tâches sauvegardées
document.addEventListener("DOMContentLoaded", loadTasks);

// Ajouter une tâche
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        addTask(taskText);
        saveTasks();
        taskInput.value = "";
    }
});

// Ajouter une tâche en appuyant sur "Entrée"
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTaskBtn.click();
    }
});

// Fonction pour ajouter une tâche
function addTask(text) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${text}</span>
        <button class="delete-btn">❌</button>
    `;

    // Marquer comme complétée
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
    });

    // Supprimer une tâche
    li.querySelector(".delete-btn").addEventListener("click", (e) => {
        e.stopPropagation(); // Empêche l'effet de marquage
        li.remove();
        saveTasks();
    });

    taskList.appendChild(li);
}

// Sauvegarder les tâches dans Local Storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#task-list li").forEach((li) => {
        tasks.push({
            text: li.querySelector("span").innerText,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Charger les tâches sauvegardées
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
        addTask(task.text);
        if (task.completed) {
            document.querySelector("#task-list li:last-child").classList.add("completed");
        }
    });
}
