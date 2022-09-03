hljs.highlightAll();

//윈도우
const windowBtn = document.querySelector(".window__btn");
const windowCont = document.querySelector(".window__cont");
const windowClose = document.querySelector(".window__cont .close");

windowBtn.addEventListener("click", () => {
    windowCont.classList.add("show");
    windowCont.classList.remove("hide");
});
windowClose.addEventListener("click", () => {
    windowCont.classList.add("hide");
});

//타이틀 메뉴
const titBtn = document.querySelectorAll(".window__box .menu__bar >  span");
const titCont = document.querySelectorAll(".window__box .cont > div");


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