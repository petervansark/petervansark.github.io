
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

const xhrLinks = () => {

    const linkjes = document.querySelectorAll('a.xhr');
        
    for(i = 0; i <= linkjes.length-1; i++) {
      linkjes[i].onclick = (el) => {
        el.preventDefault();
            const linkData = el.currentTarget;
            pagePlease(linkData);
        }
      }
};

const pagePlease = (link) => {

    const pageCont = document.querySelector('main');
    const parser = new DOMParser();

    fetch(link)
    .then(
        function(response) {
        if (response.status !== 200) {
            console.log('Computer says no ' +
            response.status + ' on ' + link);
            return;
        }

        response.text().then(function(data) {
            const inhoud = parser.parseFromString(data, "text/html");
            const dezeHtml = inhoud.querySelector('main');
            pageCont.innerHTML = dezeHtml.innerHTML;
            xhrLinks();
        })
        }
    )
    .catch(function(err) {
        console.log('Oeps: ', err);
    });
}

window.onload = function() {
    xhrLinks();
};