const addBtn = document.querySelector(".add-new");
const modal = document.querySelector(".modal");
const closeBtn = document.getElementById("close-btn");


console.log(modal);
addBtn.addEventListener("click", ()=> {
    modal.classList.add("active");
})

closeBtn.addEventListener("click", ()=> {
    modal.classList.remove("active");
})

function activateEl(e){
    console.log(e.target);
    e.target.classList.add("active");
}

function deactivateEl(e){
    e.classList.remove("active");
}