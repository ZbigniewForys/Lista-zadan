{
    const tasks = [];

    const changeDone = (indexDone) => {
        tasks[indexDone].done = !tasks[indexDone].done;
        render();
    }

    const addTask = (newTask) => {
        if (newTask !== "") {
            tasks.push({
                content: newTask,
                done: false,
            })
        }
    }

    const removeTask = (indexTag) => {
        tasks.splice(indexTag, 1);
        render()
    }

    const AddTaskButtonClick = () => {
        const newTaskContent = document.querySelector(".js-newTask");
        const buttonAddTask = document.querySelector(".js-buttonAddTask");
        buttonAddTask.addEventListener("click", () => {
            addTask(newTaskContent.value.trim());
            newTaskContent.value = "";
            newTaskContent.focus();
        })
    }

    const buttonRemoveTask = () => {
        const removeButtons = document.querySelectorAll(".js-buttonRemove");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    }

    const buttonChangeDone = () => {
        const changeDoneButtons = document.querySelectorAll(".js-button");
        changeDoneButtons.forEach((changeDoneButton, index) => {
            changeDoneButton.addEventListener("click", () => {
                changeDone(index);
            });
        });
    }

    const renderTasks = () => {
        let htmlText = "";
        for (const task of tasks) {
            htmlText +=
                ` <li class="tasksList__line" > 
                    <button class="tasksList__button js-button" > 
                       ${task.done ? "✓" : ""}                                             
                    </button> 
                    <p class="tasksList__paragraph 
                       ${task.done ? " tasksList__paragraph--done " : ""}">
                       ${task.content}</p>
                     <button class="tasksList__button tasksList__button--remove js-buttonRemove">🗑</button> 
                 </li > `;
        };
        document.querySelector(".js-tasksList").innerHTML = htmlText;
    }

    const render = () => {
        renderTasks();
        buttonRemoveTask();
        buttonChangeDone();
    }
    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        addTask(newTaskContent);
        render();
    }

    const init = () => {
        AddTaskButtonClick();
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    }

    init();
}