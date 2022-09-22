//윈도우
const menuBtn = document.querySelector(".menu__btn");
const menuCont = document.querySelector(".modal__cont");
const menuClose = document.querySelector(".modal__close");

menuBtn.addEventListener("click", () => {
    menuCont.classList.add("show");
    menuCont.classList.remove("hide");
});
menuClose.addEventListener("click", () => {
    menuCont.classList.add("hide");
});

//타이틀 메뉴
const titBtn = document.querySelectorAll(".menu__tabs span");
const titCont = document.querySelectorAll(".cont > div");


titBtn.forEach((element, index) => {

    element.addEventListener("click", (event) => {
        event.preventDefault();


        titBtn.forEach(li => {
            li.classList.remove("active");
        })

        element.classList.add("active");


        titCont.forEach(div => {
            div.style.display = "none";
        });


        titCont[index].style.display = "block";
    });
});