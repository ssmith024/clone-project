document.addEventListener("DOMContentLoaded", () => {
    loadTasks(); // Load tasks from local storage when the page loads
  });
  
  function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");
  
    var taskText = taskInput.value;
    if (taskText.trim() === "") {
      alert("Please enter a task!");
      return;
    }
  
    var listItem = document.createElement("li");
    listItem.textContent = taskText;
  
    // Add a delete button for each task
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.classList.add("delete");
    deleteButton.onclick = function () {
      listItem.remove();
      updateLocalStorage();
    };
  
    // Toggle task completion
    listItem.addEventListener("click", function () {
      listItem.classList.toggle("completed");
      updateLocalStorage();
    });
  
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
    taskInput.value = "";
  
    updateLocalStorage();
  }
  
  function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    var taskList = document.getElementById("taskList");
  
    tasks.forEach(function (taskText) {
      var listItem = document.createElement("li");
      listItem.textContent = taskText;
  
      var deleteButton = document.createElement("button");
      deleteButton.textContent = "❌";
      deleteButton.classList.add("delete");
      deleteButton.onclick = function () {
        listItem.remove();
        updateLocalStorage();
      };
  
      listItem.addEventListener("click", function () {
        listItem.classList.toggle("completed");
        updateLocalStorage();
      });
  
      listItem.appendChild(deleteButton);
      taskList.appendChild(listItem);
    });
  }
  
  function updateLocalStorage() {
    var tasks = [];
    var taskElements = document.querySelectorAll("#taskList li");
    taskElements.forEach(function (taskElement) {
      tasks.push(taskElement.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
