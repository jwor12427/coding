let lastSCroll = 0;

function scrollProgress(){
    nowScroll = true;

    setInterval(() => {
        if(nowScroll){
            nowScroll = false;
            hasScroll();
        }
    },300)
}
document.querySelector(".cssicon").addEventListener("click", () => {
    window.scrollTo({left: 0, top: 0, behavior: "smooth"});
});
function hasScroll(){
    let scrollTop = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;

    if(scrollTop >= (document.body.scrollHeight - window.outerHeight)-200) {
        document.querySelector(".cssicon").classList.add("show");
    } else {
        document.querySelector(".cssicon").classList.remove("show");
    }
}
window.addEventListener("scroll", scrollProgress);