// Selecionamos os elementos
const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");
const tasksContainer = document.querySelector(".tasks-container");

// Criamos uma função para validar o input
const validateInput = () => inputElement.value.trim().length > 0;
// Criamos outra função para adicionar as tarefas
const handleAddTask = () => {
  const inputIsValid = validateInput();
  // Verificamos se o input está vazio e se estiver vamos adicionar uma classe error nele
  if (!inputIsValid) {
    return inputElement.classList.add("error");
  }
  //  Criamos um elemento div e adicionamos uma classe nela
  const taskItemContainer = document.createElement("div");
  taskItemContainer.classList.add("task-item");
  //  Criamos um elemento p que recebe o que foi digitado no input
  const taskContent = document.createElement("p");
  taskContent.innerText = inputElement.value;

  // Adicionamos um evento de click no conteudo das tarefas
  taskContent.addEventListener("click", () => handleClick(taskContent));

  //  Criamos um elemento i /icone e adicionamos as classes dele
  const deleteItem = document.createElement("i");
  deleteItem.classList.add("far");
  deleteItem.classList.add("fa-trash-alt");

  //  Adicionamos um evento ao clicar no icone do deleteItem
  deleteItem.addEventListener("click", () =>
    handleDeleteClick(taskItemContainer, taskContent)
  );

  // Adicionamos os elementos taskContent e deleteItem como filhos dentro do taskItemContainer
  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteItem);

  //  E adicionamos taskItemContainer como filho dentro de tasksContainer
  tasksContainer.appendChild(taskItemContainer);

  //  Aqui deixamos o valor padrão do input como vazio
  inputElement.value = "";

  //    Aqui chamamos a função para atualizar o localStorage a cada ação
  updateLocalStorage();
};

//  Criamos uma função para concluir a tarefa
const handleClick = (taskContent) => {
  //  childNodes irá pegar todos os filhos de tasksContainer
  const tasks = tasksContainer.childNodes;
  // Iremos realizar um loop nas tarefas e verificar se o elemento atual está sendo clicado, ao clicar no elemento alteramos a classe dele para completed como uma tarefa completa e alteramos o estilo do elemento
  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);
    if (currentTaskIsBeingClicked) {
      task.firstChild.classList.toggle("completed");
    }
  }
  //    Aqui chamamos a função para atualizar o localStorage a cada ação
  updateLocalStorage();
};

// Criamos uma função para remover as tarefas
//  Utilizamos da mesma lógica acima, realizamos um loop para verificar qual elemento foi clicado e removemos ele
const handleDeleteClick = (taskItemContainer, taskContent) => {
  const tasks = tasksContainer.childNodes;
  for (const task of tasks) {
    const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);
    if (currentTaskIsBeingClicked) {
      taskItemContainer.remove();
    }
  }

  //    Aqui chamamos a função para atualizar o localStorage a cada ação
  updateLocalStorage();
};

//  Criamos uma função para verificar se o input está válido
const handleInputChange = () => {
  const inputIsValid = validateInput();
  // Se tiver, iremos remover a classe error
  if (inputIsValid) {
    return inputElement.classList.remove("error");
  }
};

//  Aqui criamos uma função para atualizar o localStorage do navegador a cada ação realizada na aplicação
const updateLocalStorage = () => {
  const tasks = tasksContainer.childNodes;
  //  Aqui executa uma função para cada elemento que for armazenado no localStorage
  const localStorageTasks = [...tasks].map((task) => {
    const content = task.firstChild;
    const isCompleted = content.classList.contains("completed");

    //  Retornará assim no localStorage
    return { description: content.innerText, isCompleted };
  });

  //  Aqui transformamos o JSON em string
  localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
};

//  Função para exibir os elementos armazenados no localStorage
const refreshTasksUsingLocalStorage = () => {
  //  Aqui transformamos a string para JSON
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

  //  Verificamos se o localStorage está vazio e retornamos a aplicação
  if (!tasksFromLocalStorage) return;

  //  Relizamos o loop em cada elemento armazenado no localStorage
  for (const task of tasksFromLocalStorage) {
    //  Criamos um elemento div e adicionamos uma classe nela
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");
    //  Criamos um elemento p que recebe o que foi digitado no input
    const taskContent = document.createElement("p");
    taskContent.innerText = task.description;

    //  Verificamos se a tarefa foi completa e adicionamos uma classe completed nela
    if (task.isCompleted) {
      taskContent.classList.add("completed");
    }
    // Adicionamos um evento de click no conteudo das tarefas
    taskContent.addEventListener("click", () => handleClick(taskContent));

    //  Criamos um elemento i /icone e adicionamos as classes dele
    const deleteItem = document.createElement("i");
    deleteItem.classList.add("far");
    deleteItem.classList.add("fa-trash-alt");
    //  Adicionamos um evento ao clicar no icone do deleteItem
    deleteItem.addEventListener("click", () =>
      handleDeleteClick(taskItemContainer, taskContent)
    );
    // Adicionamos os elementos taskContent e deleteItem como filhos dentro do taskItemContainer
    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);
    //  E adicionamos taskItemContainer como filho dentro de tasksContainer
    tasksContainer.appendChild(taskItemContainer);
  }
};

//  Aqui chamamos a função para atualizar as tarefas do localStorage
refreshTasksUsingLocalStorage();

// Adicionamos um evento de click com a chamada da função handleAddTask() em addTaskButton
addTaskButton.addEventListener("click", () => handleAddTask());
// Adicionamos um evento change com a chamada da função handleInputChange() em inputElement
inputElement.addEventListener("change", () => handleInputChange());
