async function shortenUrlWithIsGd(url) {
    const apiUrl = 'https://is.gd/create.php';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: new URLSearchParams({ format: 'json', url }),
        });

        if (response.ok) {
            const data = await response.json();
            return data.shorturl;
        } else {
            console.error('Error response from Is.gd API:', response.status);
            return null;
        }
    } catch (error) {
        console.error(`Error making Is.gd API request: ${error.message}`);
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

    const shortenedUrl = await shortenUrlWithIsGd(userUrl);

    if (shortenedUrl) {
        // Create an anchor element
        const linkElement = document.createElement('a');
        linkElement.href = shortenedUrl;
        linkElement.target = '_blank'; // Open the link in a new tab

        // Set the text content of the anchor element
        linkElement.textContent = shortenedUrl;

        // Append the anchor element to the resultMessage div
        resultMessage.innerHTML = 'Shortened URL: ';
        resultMessage.appendChild(linkElement);
    } else {
        resultMessage.innerText = 'Error shortening the URL.';
    }
}
