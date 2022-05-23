const formElement = document.getElementById('linkForm');
const inputElement = document.getElementById('linkInput');
const textDiv = document.getElementById('linkText');
const shortLinkContainer = document.getElementById('shortLinkContainer');

formElement.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = { orgLink: inputElement.value }

    const response = await fetch("http://localhost:3000/links", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    });
    const responseJSON = await response.json();
    console.log(responseJSON.shortLinkID);
    const adress = window.location.href.split("//")[1]
    textDiv.textContent = adress + responseJSON.shortLinkID;
    shortLinkContainer.style.display = "block";
})