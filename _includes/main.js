
const menuToggle = () => {
    const slide = document.getElementById('slide');
    slide.classList.toggle("open");
}

const leesMeer = (id, button) => {
    const blok = document.getElementById(id, button);
    blok.classList.toggle("open");
    button.classList.toggle("open");
    if (button.text == "Open") {
        console.log(button.text);
        button.innerHTML = "Sluit";
    }
    else if (button.text == "Sluit") {
        button.innerHTML = "Open";
    }
}