class Header {
    placeToRender;
    headerElement;
    h1Element;

    constructor(placeToRender) {
        this.placeToRender = placeToRender;

        this.headerElement = document.createElement('header');
        this.h1Element = document.createElement('h1');

        this.h1Element.innerText = 'Kies je avatar';

        this.render();
    }

    render = () => {
        this.placeToRender.appendChild(this.headerElement);
        this.headerElement.appendChild(this.h1Element);
    }
}

class AvatarCirlce {
    placeToRender;
    liElement;
    buttonElement;
    imgElement;
    id;
    alt;
    src;
    number;
    mainApp;

    constructor(placeToRender, id, number, mainApp) {
        this.number = number;
        this.placeToRender = placeToRender;
        this.id = id;
        this.mainApp = mainApp;

        this.liElement = document.createElement('li');
        this.buttonElement = document.createElement('button');
        this.imgElement = document.createElement('img');

        this.liElement.classList = 'circle';
        this.liElement.id = this.id;
        this.buttonElement.classList = 'img-buttons';

        if (this.id > 6) {
            this.alt = 'random';
            this.src = `./img/question.webp`;
            this.liElement.classList = 'random__circle-1';
        } else {
            this.alt = this.id;
            this.src = `./img/av-${this.number}.webp`;
        }

        this.imgElement.src = this.src;;
        this.imgElement.alt = `avatar-${this.alt}`;
        this.imgElement.classList = 'avatar-frame';

        this.addEventListener();
        this.render();
    }

    addEventListener = () => {
        this.liElement.addEventListener('click', () => {
            this.setAllToNormal();
            if(this.alt == 'random') {
                this.mainApp.listenForCall(0);
                this.liElement.classList.add('random__circle-1__active');
            } else {
                this.mainApp.listenForCall(this.number);
                this.liElement.classList.add('circle__active');
            }
        })
    }

    setAllToNormal = () => {
        for(let i = 1; i < 8; i++) {
            if(i == this.id){};
            const element = document.getElementById(i);
            if(element.classList.contains('circle__active')) element.classList.remove('circle__active');
            if(element.classList.contains('random__circle-1__active')) element.classList.remove('random__circle-1__active');
        } 
    }

    render = () => {
        this.placeToRender.appendChild(this.liElement);
        this.liElement.appendChild(this.buttonElement);
        this.buttonElement.appendChild(this.imgElement);
    }
}

class Avatars {
    placeToRender;
    mainElement;
    listElement;
    randomListElement;

    constructor(placeToRender) {
        this.placeToRender = placeToRender;

        this.mainElement = document.createElement('main');
        this.listElement = document.createElement('ul');
        this.randomListElement = document.createElement('ul');

        this.mainElement.classList = 'overlay';
        this.listElement.classList = 'circles';
        this.randomListElement.classList = 'random-circles';

        this.render();
    }

    render = () => {
        this.placeToRender.appendChild(this.mainElement);
        this.mainElement.appendChild(this.listElement);
        this.mainElement.appendChild(this.randomListElement);
    }
}

class Button {
    placeToRender;
    buttonElement;
    mainApp;

    constructor(placeToRender, mainApp) {
        this.placeToRender = placeToRender;
        this.mainApp = mainApp;

        this.buttonElement = document.createElement('button');
        this.buttonWrapper = document.createElement('div');

        this.buttonElement.classList = 'Proceed__Button';
        this.buttonElement.textContent = 'Proceed';

        this.buttonWrapper.classList = 'button__Wrapper';

        this.addEventListener();
        this.render();
    }

    addEventListener = () => {
        this.buttonElement.addEventListener('click', () => {
            this.mainApp.listenForCall('buttonClicked');
        })
    }

    render = () => {
        this.placeToRender.appendChild(this.buttonWrapper);
        this.buttonWrapper.appendChild(this.buttonElement);
    }
}

class App__avatar {
    placeToRender;
    header;
    avatars;
    avatarCard;
    RandomNumber;
    mainApp;

    constructor(placeToRender, mainApp) {
        this.placeToRender = document.getElementsByTagName(placeToRender)[0];
        this.mainApp = mainApp;

        this.header = new Header(this.placeToRender);
        this.avatars = new Avatars(this.placeToRender);
        this.button = new Button(this.placeToRender, this);
        this.RandomNumber = new RandomNumber([1, 2, 3, 4, 5, 6]);

        this.generateAvatars(this.RandomNumber.array);
    }

    generateAvatars = (numArray) => {
        for (let i = 1; i < 8; i++) {
            if (i != 7) {
                this.avatarCard = new AvatarCirlce(this.avatars.listElement, i, numArray[i - 1], this);
            } else this.avatarCard = new AvatarCirlce(this.avatars.randomListElement, i, 0, this);
        }
    }

    listenForCall = (optionOrNumber) => {
        this.mainApp.handleCallFromAvatar(optionOrNumber);
    }
}