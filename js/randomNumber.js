class RandomNumber {
    array;

    constructor(array) {
        this.array = array;

        this.i = this.array.length;
        this.j = 0;
        this.temp = [];
        while (this.i--) {
            this.j = Math.floor(Math.random() * (this.i + 1));
            this.temp = this.array[this.i];
            this.array[this.i] = this.array[this.j];
            this.array[this.j] = this.temp;
        }
    }
}