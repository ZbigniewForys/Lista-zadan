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
    const defineClickButtonAddTask = () => {
        const newTaskContent = document.querySelector(".js-newTask");
        const buttonAddTask = document.querySelector(".js-buttonAddTask");
        buttonAddTask.addEventListener("click", () => {
            if (newTaskContent.value.trim() !== "") {

                addTask(newTaskContent.value);
                newTaskContent.value = "";
            }
            newTaskContent.focus();
        })
    }

    const render = () => {
        let htmlText = "";
        for (const task of tasks) {

            htmlText +=
                ` <li class="tasksList__line" > `
            htmlText += ` 
            <button class= ${task.done ? "\"tasksList__button js-button\"" :
                    "\"tasksList__button tasksList__button--off js-button\""}>
            </button> 
            <p class="tasksList__paragraph" ${task.done ? "style = \"color:rgb(128,128,128) ;  text-decoration:line-through\"" : ""}   > ${task.content}</p> 
              <button class="tasksList__button tasksList__button--remove js-buttonRemove"></button> 
                     </li>   `;
        };



        document.querySelector(".js-tasksList").innerHTML = htmlText;

        const removeButtons = document.querySelectorAll(".js-buttonRemove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });


        const changeDoneButtons = document.querySelectorAll(".js-button");
        changeDoneButtons.forEach((changeDoneButton, index) => {
            changeDoneButton.addEventListener("click", () => {
                changeDone(index);


            });
        });
    }
    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        addTask(newTaskContent);
        render();
    }


    const init = () => {
        defineClickButtonAddTask();
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    }

    init();
}
