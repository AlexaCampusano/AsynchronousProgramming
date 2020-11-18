class CognitiveServicesAPI {
    constructor() {
        this.headers = {
            'Ocp-Apim-Subscription-Key': '{your_api_key}',
            'Content-Type': 'application/json'
        }
        this.baseUrl = 'https://eastus.api.cognitive.microsoft.com';
    }

    analyzeKeyPhrases = (text) => {
        const url = `${this.baseUrl}/text/analytics/v2.0/keyPhrases`;
        const body = { documents: [ { language: 'en', id: '1', text: text } ] };

        const initObject = {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
        };

        const request = new Request(url, initObject);

        return fetch(request)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }

            return Promise.reject(new Error(response.statusText));
        })
        .catch((err) => Promise.reject(err));
    }
}

class TextAnalytics {
    textElement = document.getElementById('text-analytics-box');
    resultsElement = document.getElementById('results');
    errorsElement = document.getElementById('errors');
    totalPhrasesElement = document.getElementById('total-phrases');
    analyzeBtn = document.getElementById('analyze-btn');

    constructor() {
        this.cognitiveServiceAPI = new CognitiveServicesAPI();
    }

    analyze = () => {
        this.cognitiveServiceAPI.analyzeKeyPhrases(this.textElement.value).then(response => {
            if (response && response.documents && response.documents.length) {
                this.displayKeyPhrases(response.documents[0].keyPhrases);
            }
            
        }).catch(err => {
            this.resultsElement.innerHTML = '';
            this.errorsElement.innerHTML = err;
        });
    }

    init = () => {
        this.analyzeBtn.addEventListener('click', this.analyze);
    }

    createTag = (value) => {
        const createdElement = document.createElement('li');
        createdElement.innerHTML = value;
        createdElement.classList.add('tag');
        return createdElement;
    }

    displayKeyPhrases = (keyPhrases) => {
        this.resultsElement.innerHTML = '';
        if (keyPhrases && keyPhrases.length) {
            this.totalPhrasesElement.innerHTML = keyPhrases.length;
            keyPhrases.forEach(phrase => {
                var element = this.createTag(phrase);
                this.resultsElement.appendChild(element);
            });
        } else {
            this.resultsElement.innerHTML = '';
            this.totalPhrasesElement.innerHTML = 0;
        }
    }
}

window.onload = () => {
    const textAnalytics = new TextAnalytics();

    textAnalytics.init();
}

