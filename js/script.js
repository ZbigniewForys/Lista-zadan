{
    let tasks = [];

    const changeDone = (indexDone) => {
        tasks = [
            ...tasks.slice(0, indexDone),
            {
                ...tasks[indexDone], done: !tasks[indexDone].done,
            },
            ...tasks.slice(indexDone + 1),
        ]
        render();
    }

    const addTask = (newTask) => {
        if (newTask !== "") {
            tasks = [
                ...tasks,
                { content: newTask, done: false }
            ];
            render();
        }
    }

    const changeDoneAll = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        })
        );
        render();
    }

    const removeTask = (indexTask) => {
        tasks = [...tasks.slice(0, indexTask),
        ...tasks.slice(indexTask + 1),];
        render()
    }

    let hideTasks = false;
    const buttonHide = document.querySelector(".js-buttonHide");
    buttonHide.addEventListener("click", () => {
        hideTasks = !hideTasks;
        render();
    })

    const renderButtons = () => {
        const buttonHide = document.querySelector(".js-buttonHide");
        buttonHide.innerHTML = `<button class="buttons__button
        ${tasks.length === 0 ? " buttons__button--hide" : ""} 
        js-buttonHide">Ukryj wykonane</button>`    ;
        if (hideTasks)
            buttonHide.textContent = "Pokaż wykonane";
        const buttonChangeDoneAll = document.querySelector(".js-buttonChangeAll");
        buttonChangeDoneAll.innerHTML = `<button class="buttons__button
            ${tasks.length === 0 ? " buttons__button--hide" : ""}         
            js-buttonChangeAll " 
            ${tasks.every(({ done }) => done) ? " disabled" : ""} 
            >Zaznacz wszystkie</button>`;
    }

    const addTaskButtonClick = () => {
        const newTaskContent = document.querySelector(".js-newTask");

        const buttonAddTask = document.querySelector(".js-buttonAddTask");
        buttonAddTask.addEventListener("click", () => {
            addTask(newTaskContent.value.trim());
            newTaskContent.value = "";
            newTaskContent.focus();
        })
    }

    const removeButtonTask = () => {
        const removeButtons = document.querySelectorAll(".js-buttonRemove");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    }

    const changeButtonDone = () => {
        const changeDoneButtons = document.querySelectorAll(".js-button");
        changeDoneButtons.forEach((changeDoneButton, index) => {
            changeDoneButton.addEventListener("click", () => {
                changeDone(index);
            });
        });
    }
    const buttonChangeAll = () => {
        const changeButtonDoneAll = document.querySelector(".js-buttonChangeAll");
        changeButtonDoneAll.addEventListener("click", () => {
            changeDoneAll();

        });
    }

    const renderTasks = () => {
        const taskHtml = task =>
            ` <li class="tasksList__line${hideTasks && task.done ? " tasksList__line--hidden" : ""}" > 
                    <button class="tasksList__button js-button" > 
                       ${task.done ? "✓" : ""}                                             
                    </button> 
                    <p class="tasksList__paragraph 
                       ${task.done ? " tasksList__paragraph--done " : ""}">
                       ${task.content}</p>
                     <button class="tasksList__button tasksList__button--remove js-buttonRemove">🗑</button> 
                 </li > `;

        const tasksElement = document.querySelector(".js-tasksList");
        tasksElement.innerHTML = tasks.map(taskHtml).join("");
    };

    const render = () => {
        renderTasks();
        removeButtonTask();
        changeButtonDone();
        buttonChangeAll();
        renderButtons();
    }
    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        addTask(newTaskContent);
        render();
    }

    const init = () => {
        addTaskButtonClick();
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    }

    init();
}