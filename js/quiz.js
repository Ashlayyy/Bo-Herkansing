class Quiz {
    avatarUrl = undefined;
    percentageHandler = undefined;
    mainApp = undefined;
    placeToRender = undefined;
    results = undefined;
    houseArray = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];

    constructor(percentageHandler, avatarUrl, mainApp) {
        this.percentageHandler = percentageHandler;
        this.avatarUrl = avatarUrl;
        this.mainApp = mainApp;

        this.placeToRender = document.getElementsByTagName(this.mainApp.placeToRender)[0];

        this.section = document.createElement('section');
        this.section.classList = 'percentage'
        this.titleElement = document.createElement("h4");
        this.titleElement.innerText = "Percentage";
        this.titleElement.classList = 'percentage__title';
        this.pElement = document.createElement("p");
        this.pElement.innerText =
            `Hieronder staan de resultaten van uw quiz. Deze quiz is gemaakt door een computer en wordt automatisch berekent. Er is geen garantie dat ie telkens dezelfde resultaten krijgt als u deze test nogmaals start.`;
        this.pElement.classList = 'percentage__p';
        this.resultElement = document.createElement('p');
        this.resultElement.classList = 'percentage__result';
        this.avatarElement = document.createElement('img');
        this.avatarElement.classList = 'percentage__img';
        this.avatarElement.src = this.avatarUrl;

        this.render();
        this.handlerFunctions();
    }

    handlerFunctions = () => {
        this.percentageHandler.handleQuestion(Math.floor(Math.random() * 5), this.houseArray[Math.floor(Math.random() * 4)])
        this.percentageHandler.handleQuestion(Math.floor(Math.random() * 4), this.houseArray[Math.floor(Math.random() * 4)]);
        this.percentageHandler.handleQuestion(Math.floor(Math.random() * 2), this.houseArray[Math.floor(Math.random() * 4)]);
        this.percentageHandler.handleQuestion(Math.floor(Math.random() * 4), this.houseArray[Math.floor(Math.random() * 4)]);
        this.percentageHandler.handleQuestion(Math.floor(Math.random() * 6), this.houseArray[Math.floor(Math.random() * 4)]);
        this.percentageHandler.handleQuestion(Math.floor(Math.random() * 10), this.houseArray[Math.floor(Math.random() * 4)]);
        this.percentageHandler.handleQuestion(Math.floor(Math.random() * 4), this.houseArray[Math.floor(Math.random() * 4)]);
        this.results = this.percentageHandler.done();

        this.resultElement.innerHTML = `
        ${this.results[0][3][0]}: ${this.results[0][3][1]}%
        ${this.results[0][2][0]}: ${this.results[0][2][1]}%
        ${this.results[0][1][0]}: ${this.results[0][1][1]}%
        ${this.results[0][0][0]}: ${this.results[0][0][1]}%
        `
    }

    render = () => {
        this.placeToRender.appendChild(this.section);
        this.section.appendChild(this.titleElement);
        this.section.appendChild(this.avatarElement);
        this.section.appendChild(this.pElement);
        this.section.appendChild(this.resultElement);
    };
}