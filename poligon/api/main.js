const axios = require('axios');
const apiKey = process.argv[2];

const getData = async () => {
    const response = await axios.get('https://poligon.aidevs.pl/dane.txt');
    return response.data;
}

const postAnswer = async (answer) => {
    const response = await axios.post('https://poligon.aidevs.pl/verify', answer, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
}

getData().then(data => {
    const dataArray = data.split('\n').map(line => line.trim()).filter(line => line !== '');
    const answer = {
        task: "POLIGON",
        apikey: apiKey,
        answer: dataArray
    }
    postAnswer(answer).then(response => {
        console.log(response);
    }).catch(error => {
        console.error('Error posting data:', error);
    });
}).catch(error => {
    console.error('Error getting data:', error);
});