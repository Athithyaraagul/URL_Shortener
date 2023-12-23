async function shortenUrl(url) {
    const apiKey = 'bd26d4c3894d40a19b4058dd8490ef5e'; // Replace with your Rebrandly API key
    const apiUrl = 'https://api.rebrandly.com/v1/links';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': apiKey,
            },
            body: JSON.stringify({
                destination: url,
            }),
        });

        const responseData = await response.json();
        console.log('Response Data:', responseData);

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

async function shortenAndDisplay() {
    const urlInput = document.getElementById('urlInput');
    const resultMessage = document.getElementById('resultMessage');

    const userUrl = urlInput.value.trim();

    if (userUrl === '') {
        resultMessage.innerText = 'Please enter a valid URL.';
        return;
    }

    const shortenedUrl = await shortenUrl(userUrl);

    if (shortenedUrl) {
        resultMessage.innerText = `Shortened: ${shortenedUrl}`;
    } else {
        resultMessage.innerText = 'Error shortening the URL.';
    }
}
