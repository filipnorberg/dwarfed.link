const formElement = document.getElementById('linkForm');
const inputElement = document.getElementById('linkInput');
const linkElement = document.getElementById('linkText');
const shortLinkElement = document.getElementById('shortLinkContainer');
const copyElement = document.getElementById('copy');

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
    const adress = window.location.href.split("//")[1]
    linkElement.textContent = adress + responseJSON.shortLinkID;
    shortLinkElement.style.display = "block";
})


copyElement.addEventListener('click', (event) => {
    linkElement.focus();
    navigator.clipboard.writeText(linkElement.textContent);
    copyElement.textContent = "Copied!";
});
