// script.js
async function shortenUrl(url) {
    const apiUrl = 'https://api.rebrandly.com/v1/links';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': 'bd26d4c3894d40a19b4058dd8490ef5e', //Rebrandly API key
            },
            body: JSON.stringify({
                destination: url,
            }),
        });

        const responseData = await response.json();
        if (response.ok) {
            return responseData.shortUrl;
        } else {
            console.error('Error response from API:', responseData);
            return null;
        }
    } catch (error) {
        console.error(`Error making API request: ${error.message}`);
        return null;
    }
}

async function ShortenAndDisplay() {
    const urlInput = document.getElementById('urlInput');
    const resultMessage = document.getElementById('resultMessage');

    const userUrl = urlInput.value.trim();

    if (userUrl === '') {
        resultMessage.innerText = 'Please enter a valid URL.';
        return;
    }

    const beautifiedUrl = await shortenUrl(userUrl);

    if (beautifiedUrl) {
        // Create an anchor element
        const linkElement = document.createElement('a');
        linkElement.href = beautifiedUrl;
        linkElement.target = '_blank'; // Open the link in a new tab

        // Set the text content of the anchor element
        linkElement.textContent = beautifiedUrl;

        // Append the anchor element to the resultMessage div
        resultMessage.innerHTML = 'Shorten URL: ';
        resultMessage.appendChild(linkElement);
    } else {
        resultMessage.innerText = 'Error shortening the URL.';
    }
}
