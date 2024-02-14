const addBtn = document.querySelector(".add-new");
const modal = document.querySelector(".modal");
const closeBtn = document.getElementById("close-btn");


addBtn.addEventListener("click", ()=> {
    modal.classList.add("active");
})

closeBtn.addEventListener("click", ()=> {
    modal.classList.remove("active");
})