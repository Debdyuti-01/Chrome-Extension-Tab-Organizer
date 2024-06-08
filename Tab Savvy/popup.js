document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const tabList = document.getElementById('tab-list');
    const groupByDomainButton = document.getElementById('group-by-domain');
    const groupByContentButton = document.getElementById('group-by-content');
    const pomodoroButton = document.getElementById('start-pomodoro');
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const tasksList = document.getElementById('tasks');
    const noteInput = document.getElementById('note-input');
    const addNoteButton = document.getElementById('add-note-button');
    const notesList = document.getElementById('notes');
    const timerDisplay = document.getElementById('timer-display');
    let countdownInterval;
    let remainingTime;

    searchInput.addEventListener('input', function() {
      const query = searchInput.value.toLowerCase();
      searchTabs(query);
    });

    groupByDomainButton.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'groupByDomain' });
    });

    groupByContentButton.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'groupByContent' });
    });

    pomodoroButton.addEventListener('click', startPomodoro);

    addTaskButton.addEventListener('click', addTask);
    addNoteButton.addEventListener('click', addNote);

    function searchTabs(query) {
      // Search functionality implementation
    }

    function startPomodoro() {
      const workTime = 25 * 60; // 25 minutes in seconds
      remainingTime = workTime;
      updateTimerDisplay();
      countdownInterval = setInterval(() => {
        remainingTime--;
        updateTimerDisplay();
        if (remainingTime <= 0) {
          clearInterval(countdownInterval);
          alert("Time's up! Take a break.");
        }
      }, 1000);
    }

    function updateTimerDisplay() {
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;
      timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;
        tasksList.appendChild(taskItem);
        taskInput.value = '';
        // Add logic to store tasks if needed
      }
    }

    function addNote() {
      const noteText = noteInput.value.trim();
      if (noteText !== '') {
        const noteItem = document.createElement('li');
        noteItem.textContent = noteText;
        notesList.appendChild(noteItem);
        noteInput.value = '';
        // Add logic to store notes if needed
      }
    }
});
