class FaceRecognition {
    imgUrlElement = document.getElementById('imageUrl');
    imgElement = document.getElementById('image');
    ageElement = document.getElementById('age');
    genderElement = document.getElementById('gender');
    analyzeBtn = document.getElementById('analyze-btn');
    errorElement = document.getElementById('errors');

    constructor() {
        this.cognitiveServiceAPI = new CognitiveServicesAPI();
    }

    analyze = () => {
        this.imgElement.src = this.imgUrlElement.value;
        this.cognitiveServiceAPI.analyzeFace(this.imgUrlElement.value).then(response => {
            if (response && response.length) {
                const faceAttributes = response[0].faceAttributes;
                this.genderElement.innerHTML = faceAttributes.gender;
                this.ageElement.innerHTML = faceAttributes.age;
                this.errorElement.innerHTML = ''
            } else {
                this.genderElement.innerHTML = '';
                this.ageElement.innerHTML = '';
                this.errorElement.innerHTML = 'The image was not recognized as a person.';
            }
            
        }).catch(err => {
            this.errorElement.innerHTML = err;
        });
    }

    init = () => {
        this.analyzeBtn.addEventListener('click', this.analyze);
    }
}

window.onload = () => {
    const faceRecognition = new FaceRecognition();

    faceRecognition.init();
}