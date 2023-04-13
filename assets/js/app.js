// Select Elements
let todoİnput = document.getElementById("create-todo");
let dateİnput = document.getElementById("create-date");
let addButton = document.getElementById("add-todo");
let searchİnput = document.getElementById("filtter-todo");
let clearButton = document.getElementById("clear-todos");
let list = document.getElementById("todos");
let btn = document.getElementsByClassName("btn-wrapper");
let cardBody = document.getElementById("card-body2");
let completedList = document.getElementById("completed-list");
let failedList = document.getElementById("failed-list");

// Variable Definition
let failedObjects;
let completedObject;
let todos;
let interval;
// EventListeners
addButton.addEventListener("click", createNewTodo);

cardBody.addEventListener("click", btnClick);

clearButton.addEventListener("click", clearİtems);

searchİnput.addEventListener("keyup",filterTodos);

// document.addEventListener("DOMContentLoaded", loadAllTodosToUI);

// Functions
function createNewTodo() {
    var selectDate = new Date(dateİnput.value);
    var newDay = new Date();
    var selectDateValue = selectDate.getTime();
    var NewDateValue = newDay.getTime();

    if (selectDateValue > NewDateValue) {
        // Create New Element
        var addTodo = todoİnput.value.trim();
        var addDate = dateİnput.value;
        var newTodos = document.createElement("li");
        var newText = document.createElement("p");
        var newDate = document.createElement("p");
        var newDayCounter = document.createElement("p");
        var newButtons = document.createElement("div");
        var cancelButtons = document.createElement("button");
        var completedButtons = document.createElement("button");
        //  Get Date and Calculate The Days Between Two Dates
        var currentDay = new Date();
        var selectDay = new Date(addDate);
        var dayDifference = selectDay.getTime() - currentDay.getTime();
        var totalDays = Math.ceil(dayDifference / (1000 * 3600 * 24));
        // Add Classes to New Elements
        newText.appendChild(document.createTextNode(addTodo));
        newDate.innerHTML = addDate;
        newTodos.className = "list-item d-flex";
        newDayCounter.innerHTML = totalDays + " Day";
        newButtons.className = "btn-wrapper";
        cancelButtons.className = "btn btn-danger btn-cancel";
        cancelButtons.innerHTML = "Cancel";
        completedButtons.className = "btn btn-success btn-completed";
        completedButtons.innerHTML = "Completed";
        // Identifying Their Parents
        newButtons.appendChild(completedButtons);
        newButtons.appendChild(cancelButtons);
        newTodos.appendChild(newText);
        newTodos.appendChild(newDate);
        newTodos.appendChild(newDayCounter);
        newTodos.appendChild(newButtons);
        list.appendChild(newTodos);
        // Cleaning the Inside of the Inputs
        todoİnput.value = "";
        dateİnput.value = "";
        // Date Requirement
        if (addDate == "" || addTodo == "") {
            alert("You did not enter the date.!");
            list.innerHTML = "";
        }
        
            interval = setInterval(timerDay, 1000 * 3600 * 24);
        function timerDay() {
            totalDays--;
            if (totalDays > 0){
                newDayCounter.innerHTML = totalDays + " Day";
                
            }
            else {
                newDayCounter.innerHTML = "Time Out";
                
                if (totalDays == 0 || totalDays < 0) {
                    failedObjects = newTodos;
                    newTodos.remove();
                    failedList.appendChild(failedObjects);
                    if (failedList != "") {
                        failedObjects.style.background = "red";
                        failedObjects.lastElementChild.remove();
                        let xmarkDiv = document.createElement("div");
                        let xmark = document.createElement("i");
                        xmarkDiv.className = "btn-wrapper";
                        xmark.className = "fa-solid fa-square-xmark";
                        xmarkDiv.appendChild(xmark);
                        failedObjects.appendChild(xmarkDiv);
                        clearInterval(interval);
                    }
                }
            }
        }
    }

    else {
        alert("You Cannot Enter The Date of This Day or Previous Days");
    }
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1){
            // Bulamadı

            listItem.setAttribute("style","display : none !important");

        }
        else {
            listItem.setAttribute("style","display : block");
        }
    });
}

function btnClick(e) {
    if (e.target.className === "btn btn-success btn-completed") {
        completedObject = e.target.parentElement.parentElement;
        e.target.parentElement.parentElement.remove();
        completedList.appendChild(completedObject);
        if (completedList != "") {
            completedObject.style.background = "lightblue";
            completedObject.lastElementChild.remove();
            let checkDiv = document.createElement("div");
            let check = document.createElement("i");

            checkDiv.className = "btn-wrapper";
            check.className = "fa-solid fa-square-check";
            checkDiv.appendChild(check);
            completedObject.appendChild(checkDiv);
        }
    }
    else if (e.target.className === "btn btn-danger btn-cancel") {
        failedObjects = e.target.parentElement.parentElement;
        e.target.parentElement.parentElement.remove();
        failedList.appendChild(failedObjects);
        if (failedList != "") {
            failedObjects.style.background = "red";
            failedObjects.lastElementChild.remove();
            let xmarkDiv = document.createElement("div");
            let xmark = document.createElement("i");
            xmarkDiv.className = "btn-wrapper";
            xmark.className = "fa-solid fa-square-xmark";
            xmarkDiv.appendChild(xmark);
            failedObjects.appendChild(xmarkDiv);
        }
    }
}

function clearİtems() {
    for (i = list.children.length; i > 0; i--) {
        list.removeChild(list.lastElementChild);
    }
    localStorage.clear();
}