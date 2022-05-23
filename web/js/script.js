const formElement = document.getElementById('linkForm');
const inputElement = document.getElementById('linkInput');

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
})