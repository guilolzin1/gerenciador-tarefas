// Hotfix: Corrigido bug na exclusão de tarefas - versão 1.0.1
// Array para armazenar as tarefas
let tasks = [];
let currentFilter = 'all';

// Elementos DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const clearCompletedBtn = document.getElementById('clearCompleted');
const filterBtns = document.querySelectorAll('.filter-btn');

// Carregar tarefas do localStorage ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    renderTasks();
    updateTaskCount();
});

// Adicionar nova tarefa
addTaskBtn.addEventListener('click', () => {
    addNewTask();
});

// Também permitir adicionar ao pressionar Enter
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addNewTask();
    }
});

// Limpar tarefas concluídas
clearCompletedBtn.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
    updateTaskCount();
});

// Configurar filtros
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remover classe ativa de todos os botões
        filterBtns.forEach(b => b.classList.remove('active'));
        // Adicionar classe ativa ao botão clicado
        btn.classList.add('active');
        // Definir filtro atual
        currentFilter = btn.getAttribute('data-filter');
        // Renderizar tarefas com o novo filtro
        renderTasks();
    });
});

// Função para adicionar nova tarefa
function addNewTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText !== '') {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        updateTaskCount();
        
        // Limpar o campo de entrada
        taskInput.value = '';
        taskInput.focus();
    }
}

// Função para marcar tarefa como concluída/não concluída
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    
    saveTasks();
    renderTasks();
    updateTaskCount();
}

// Função para excluir tarefa
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
    updateTaskCount();
}

// Função para renderizar as tarefas com base no filtro atual
function renderTasks() {
    // Limpar a lista
    taskList.innerHTML = '';
    
    // Filtrar tarefas de acordo com o filtro selecionado
    let filteredTasks = tasks;
    
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }
    
    // Adicionar as tarefas à lista
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        
        li.innerHTML = `
            <input type="checkbox" class="task-check" ${task.completed ? 'checked' : ''}>
            <span class="task-text">${task.text}</span>
            <button class="delete-btn">&times;</button>
        `;
        
        // Adicionar event listeners
        const checkbox = li.querySelector('.task-check');
        checkbox.addEventListener('change', () => toggleTask(task.id));
        
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        
        taskList.appendChild(li);
    });
}

// Função para atualizar o contador de tarefas restantes
function updateTaskCount() {
    const remainingTasks = tasks.filter(task => !task.completed).length;
    taskCount.textContent = `${remainingTasks} ${remainingTasks === 1 ? 'tarefa restante' : 'tarefas restantes'}`;
}

// Função para salvar tarefas no localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para carregar tarefas do localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}