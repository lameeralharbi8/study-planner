const form = document.querySelector('#form');
const input = document.querySelector('#task');
const list = document.querySelector('#tasks');
let tasks = [];
try { tasks = JSON.parse(localStorage.getItem('studyTasks') || '[]'); } catch { tasks = []; }
function render() {
  localStorage.setItem('studyTasks', JSON.stringify(tasks));
  list.replaceChildren();
  document.querySelector('#progress').textContent = `${tasks.filter(t => t.done).length} of ${tasks.length} tasks completed`;
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.done ? 'done' : '';
    const check = document.createElement('input');
    check.type = 'checkbox'; check.checked = task.done;
    check.setAttribute('aria-label', 'Complete ' + task.text);
    check.onchange = () => { task.done = check.checked; render(); };
    const label = document.createElement('span'); label.textContent = task.text;
    const remove = document.createElement('button'); remove.textContent = 'Delete';
    remove.onclick = () => { tasks.splice(index, 1); render(); };
    li.append(check, label, remove); list.append(li);
  });
}
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!input.value.trim()) return;
  tasks.push({text: input.value.trim(), done: false}); input.value = ''; render();
});
render();
