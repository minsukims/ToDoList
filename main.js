// 유저가 값을 입력한다.
// + 버튼을 클릭하면, 할일이 추가된다
// delete버튼을 누르면 할일이 삭제된다
// check버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 1. check 버튼을 클릭하는 순간 true false
// 2. true이면 끝난걸로 간주하고 밑줄 보여주기
// 3. false이면 안끝날걸로 간주하고 그대로
// 진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

const taskInput = document.querySelector("#task-input");
const addButton = document.querySelector("#add-button");
const tabs = document.querySelectorAll(".task-tabs div");
const underline = document.querySelector("#under-line");

let taskList = [];
let mode = "all";
addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
  if (taskInput.value.trim() === "") {
    alert("할일을 구체적으로 제시해주세요");
    return;
  }

  let task = {
    id: randomId(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  taskInput.value = "";
  render();
}

function render() {
  let resultHTML = "";
  let list = [];
  // 상태는 taskList의 데이터를 유지함.
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        list.push(taskList[i]);
      }
    }
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        list.push(taskList[i]);
      }
    }
  }
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete === true) {
      resultHTML += `
    <div class="task ${list[i].isComplete ? "completed" : ""}">
            <div class="task-done task-done-center">${list[i].taskContent}</div>
            <div>
              <button class="complete-btn ${list[i].isComplete ? "active" : ""}" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-calendar-check"></i></button>
              <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>`;
    } else {
      resultHTML += `
    <div class="task ${list[i].isComplete ? "completed" : ""}">
            <div>${list[i].taskContent}</div>
            <div>
              <button class="complete-btn ${list[i].isComplete ? "active" : ""}" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-calendar-check"></i></button>
              <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>`;
    }
  }
  document.querySelector("#task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (id === taskList[i].id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList);
}
function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (id === taskList[i].id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}
function filter(event) {
  mode = event.target.id;

  underline.style.left = event.target.offsetLeft + "px";
  underline.style.width = event.target.offsetWidth + "px";
  render();
}
function randomId() {
  return Math.random().toString(36).substr(2, 16);
}
