class MainApp {
    percentageHandler = undefined;
    avatarApp = undefined;
    placeToRender = undefined;
    quiz = undefined;
    number = undefined;
    avatarUrl;

    constructor (placeToRender) {
        this.placeToRender = placeToRender;
        this.percentageHandler = new Questionhandler('dynamic');
        this.avatarApp = new App__avatar(this.placeToRender, this);
    }

    handleCallFromAvatar = (avatarNumber) => {
        if (avatarNumber == 'buttonClicked') {
            if (this.number == null || this.number == undefined) return alert('Selecteer eerst een avatar!');
            
            document.getElementsByTagName('body')[0].innerHTML = '';
            this.quiz = new Quiz(this.percentageHandler, this.avatarUrl, this);
        } else {
            this.number = avatarNumber;
            if (this.number == 0) {
                this.avatarUrl = document.querySelectorAll('img')[0].src;
            } else {
                this.avatarUrl = `./img/av-${this.number}.webp`;
            }
        }
    }
}

const app = new MainApp('body');
const log = new Log();