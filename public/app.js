(() => {
  const $ = (id) => document.getElementById(id);
  const loginPanel = $('login-panel');
  const tasksPanel = $('tasks-panel');
  const loginError = $('login-error');
  const taskError = $('task-error');
  let tasks = [];
  let nextId = 1;

  function showTasks(show) {
    loginPanel.hidden = show;
    tasksPanel.hidden = !show;
  }
  function alertMessage(el, message) { el.textContent = message; el.hidden = !message; }
  function render() {
    $('task-list').replaceChildren();
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = `task${task.done ? ' done' : ''}`;
      li.dataset.testid = 'task-row';
      const check = document.createElement('input');
      check.type = 'checkbox';
      check.checked = task.done;
      check.setAttribute('aria-label', `Complete ${task.title}`);
      check.addEventListener('change', () => { task.done = check.checked; render(); });
      const span = document.createElement('span');
      span.className = 'task-label';
      span.textContent = task.title;
      const remove = document.createElement('button');
      remove.textContent = 'Delete';
      remove.type = 'button';
      remove.setAttribute('aria-label', `Delete ${task.title}`);
      remove.addEventListener('click', () => { tasks = tasks.filter(item => item.id !== task.id); render(); });
      li.append(check, span, remove);
      $('task-list').append(li);
    });
    $('total-count').textContent = `${tasks.length} tasks`;
    $('completed-count').textContent = `${tasks.filter(task => task.done).length} completed`;
    $('empty-state').hidden = tasks.length > 0;
  }
  $('login-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = $('email').value.trim();
    const password = $('password').value;
    if (!email || !password) return alertMessage(loginError, 'Email and password are required.');
    if (email !== 'qa@example.com' || password !== 'Password123!') return alertMessage(loginError, 'Invalid email or password.');
    alertMessage(loginError, '');
    $('welcome').textContent = `Welcome, ${email}`;
    tasks = []; nextId = 1; render(); showTasks(true);
  });
  $('logout').addEventListener('click', () => { $('login-form').reset(); showTasks(false); });
  $('task-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = $('task-input').value.trim();
    if (!title) return alertMessage(taskError, 'Task name is required.');
    alertMessage(taskError, '');
    tasks.push({id: nextId++, title, done:false});
    $('task-input').value = '';
    render();
  });
})();
