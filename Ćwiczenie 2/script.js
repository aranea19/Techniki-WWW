const hamburger = document.getElementById("hamburger")
const topMenu = document.getElementById("top-menu")

hamburger.addEventListener('click', () => {
    topMenu.classList.toggle('active')
})