
document.getElementById('displayTodos').addEventListener('click', async () => {
    const response = await fetch('/todos');
    const todos = await response.json();
    // TODO ➡️ Display the todos within in element id of 'todoDisplay'
  });
  

  // There a bunch of missing keywords in the following code, fix them to have the code work corretly!

  document.getElementById('submitTodo').addEventListener('click', () => {
    const name = document.getElementById('todoName').value;
    const priority = document.getElementById('todoPriority').value || 'low';
    const isFun = document.getElementById('todoIsFun').value || 'true';
  
    const todo = { name, priority, isFun };
  
    const response = fetch('/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo)
    });
  
    const result = response.json();
    alert(`Todo added: ${JSON.stringify(result)}`);
  });
  
  document.getElementById('deleteTodo').addEventListener('click', () => {
    const id = document.getElementById('todoIdToDelete').value;
    const response =  fetch(`/todos/${id}`, { method: 'DELETE' });
    const result = response.json();
    alert(result.message);
  });