
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

window.onload = function () {

    const linkjes = document.querySelectorAll('a.xhr');
        
    for(i = 0; i <= linkjes.length-1; i++) {
      linkjes[i].onclick = (link) => {
        link.preventDefault();
        // const linkData = link.target.getAttribute('data-page');
        const linkData = link.target;
        pagePlease(linkData);
      }
    };
    
    // console.log(linkjes);

}


const pagePlease = (link) => {

    const pageCont = document.querySelector('main');
    const parser = new DOMParser();

    fetch(link)
    .then(
        function(response) {
        if (response.status !== 200) {
            console.log('Computer says no ' +
            response.status);
            return;
        }

        response.text().then(function(data) {
            const inhoud = parser.parseFromString(data, "text/html");
            const dezeHtml = inhoud.querySelector('main');
            pageCont.innerHTML = dezeHtml.innerHTML;
        });

        }
    )
    .catch(function(err) {
        console.log('Oeps: ', err);
    });
       
}