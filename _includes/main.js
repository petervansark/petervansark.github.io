
const menuToggle = () => {
    const slide = document.getElementById('slide');
    slide.classList.toggle("open");
}

const leesMeer = (id, button) => {
    const blok = document.getElementById(id, button);
    blok.classList.toggle("open");
    if (button.text == "Bekijk referentie") {
        button.innerHTML = "Sluit referentie";
    }
    else if (button.text == "Sluit referentie") {
        button.innerHTML = "Bekijk referentie";
    }
}