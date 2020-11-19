class CognitiveServicesAPI {
    constructor() {
        this.headers = {
            'Ocp-Apim-Subscription-Key': '{your_api_key}',
            'Content-Type': 'application/json'
        }
        this.baseUrl = '{cognitive_service_url}';
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

    analyzeFace = (imgUrl) => {
        const params = {
            detectionModel: 'detection_01',
            returnFaceId: true,
            returnFaceAttributes: 'age,gender'
        };
        const url = `${this.baseUrl}/face/v1.0/detect?detectionModel=${params.detectionModel}&returnFaceId=${params.returnFaceId}&returnFaceAttributes=${params.returnFaceAttributes}`;
        const body = { url: imgUrl };
        

        const initObject = {
            method: 'POST',
            params: params,
            headers: this.headers,
            body: JSON.stringify(body)
        };

        const request = new Request(url, initObject);

        return fetch(request)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            return Promise.reject(new Error(response.statusText));
        })
        .catch(err => Promise.reject(err));
    }
}