const taskForm = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const task =  document.querySelector('#task');

loadEventListeners();

function loadEventListeners(){
    //load dom content
    document.addEventListener('DOMContentLoaded',loadTasks);
    //to add task item
    taskForm.addEventListener('submit',addEvent);
    //to remove task item
    taskList.addEventListener('click',removeEvent);
    //to listen to clear button
    clearButton.addEventListener('click',removeAll);
    //to filter by search
    filter.addEventListener('keyup',filterTask);
}

function addEvent(e){
    if(task.value === ''){
        alert('Add a task');
    }
    else{
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task.value));
        //creating the list item with x button
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        li.appendChild(link);
        //now append li to ul
        taskList.appendChild(li);
        //add to local storage
        addToLocalStorage(task.value);
        //clear task input
        task.value = '';
    }
    e.preventDefault();
}

function removeEvent(e){
    //console.log(e.target);
    if(e.target.className === 'fa fa-remove'){
        if(confirm('You are about to remove a task, are you sure?')){
        e.target.parentElement.parentElement.remove();
        }
        //remove from local storage
        removeItemFromLocalStorage(e.target.parentElement.parentElement);
    }
}

function removeAll(){
    while(taskList.firstChild) taskList.removeChild(taskList.firstChild);

    //clear from local storage
    localStorage.clear();
}

function filterTask(e){
    const item = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const taskvar = task.firstChild.textContent.toLowerCase();
        if(taskvar.indexOf(item) != -1){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
        }
    })
    console.log(e.target.value);
}

function addToLocalStorage(task){
    let tasks; //scope is within this function
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    }
    else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));

}

function loadTasks(){
    let tasks; //scope is within this function
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    }
    else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        //creating the list item with x button
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        li.appendChild(link);
        //now append li to ul
        taskList.appendChild(li);
    })
}

function removeItemFromLocalStorage(removeItem){
    let tasks; //scope is within this function
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    }
    else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        if(task === removeItem.textContent){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}