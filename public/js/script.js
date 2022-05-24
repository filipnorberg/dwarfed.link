const formElement = document.getElementById('linkForm');
const inputElement = document.getElementById('linkInput');
const linkElement = document.getElementById('linkText');
const shortLinkElement = document.getElementById('shortLinkWrapper');
const copyElement = document.getElementById('copy');
const errorElement = document.getElementById('error');

formElement.addEventListener('submit', async (event) => {
    event.preventDefault();
    const regEx = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    if (!regEx.test(inputElement.value)) {
        errorElement.style.display = "block";
        return;
    }
    const data = { orgLink: inputElement.value }

    const response = await fetch("/links", {
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
});


inputElement.addEventListener('input', (event) => {
    errorElement.style.display = "";
});


copyElement.addEventListener('click', (event) => {
    linkElement.focus();
    navigator.clipboard.writeText(linkElement.textContent);
    copyElement.textContent = "Copied!";
});