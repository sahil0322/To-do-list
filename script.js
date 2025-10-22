const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskBoard = document.getElementById('taskBoard');

const pastelColors = ['#fff59d', '#ffccbc', '#c8e6c9', '#bbdefb', '#d1c4e9', '#ffe0b2'];

window.addEventListener('load', loadNotes);
addTaskBtn.addEventListener('click', addNote);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addNote();
});

function addNote() {
    const text = taskInput.value.trim();
    if (!text) return;
    const note = createNoteElement(text);
    taskBoard.appendChild(note);
    taskInput.value = '';
    saveNotes();
}

function createNoteElement(text) {
    const div = document.createElement('div');
    div.className = 'note';
    div.style.background = pastelColors[Math.floor(Math.random() * pastelColors.length)];
    div.style.setProperty('--rotate', `${(Math.random() * 10 - 5).toFixed(1)}deg`);

    const pin = document.createElement('div');
    pin.className = 'pin';

    const span = document.createElement('span');
    span.textContent = text;
    span.addEventListener('dblclick', () => {
        span.contentEditable = true;
        span.focus();
    });

    span.addEventListener('blur', () => {
    span.contentEditable = false; 
        saveNotes();                
    });

    span.addEventListener('click', () => {
        if (span.contentEditable === 'true') {
            return;
     }
        div.classList.toggle('completed');
    saveNotes();
    });

const btn = document.createElement('button');
btn.textContent = '✕';
btn.className = 'delete-btn';
btn.setAttribute('aria-label', 'Delete note'); 
    btn.addEventListener('click', () => {
        div.remove();
        saveNotes();
    });

    div.appendChild(pin);
    div.appendChild(span);
    div.appendChild(btn);
    return div;
}

function saveNotes() {
    const notes = [];
    document.querySelectorAll('.note').forEach(note => {
        notes.push({
            text: note.querySelector('span').textContent,
            completed: note.classList.contains('completed'),
            color: note.style.background,
            rotate: note.style.getPropertyValue('--rotate')
        });
    });
    localStorage.setItem('stickyNotes', JSON.stringify(notes));
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('stickyNotes')) || [];
    notes.forEach(n => {
        const div = createNoteElement(n.text);
        if (n.completed) div.classList.add('completed');
        div.style.background = n.color;
        div.style.setProperty('--rotate', n.rotate);
        taskBoard.appendChild(div);
    });

}

