class Sorter {
    arraySorted = [];
    sort = (array) => {
        this.arraySorted = array.sort((a, b) => {
            return a[1] - b[1];
        });
        return this.arraySorted
    }
}

class Adder {
    add = (array) => {
        let points = 0;
        for (let a = 0; a < array.length; a++) {
            points = points + array[a];
        }
        return points;
    }
}

class Questionhandler {
    totalPoints = undefined;
    houseArray = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];
    pointsArray = [
        ['Gryffindor', []],
        ['Hufflepuff', []],
        ['Ravenclaw', []],
        ['Slytherin', []]
    ];
    scoreArray = [];
    percentageArray = [];
    adder = undefined;
    dynamic = false;
    result = [];
    sorted = undefined;
    total = undefined;


    constructor(totalPoints) {
        this.totalPoints = totalPoints;
        if (this.totalPoints == 'dynamic') this.dynamic = true;
        this.adder = new Adder();
        this.sorter = new Sorter();
    }

    handleQuestion = (points, house) => {
        if (this.dynamic) {
            for (let i = 0; i < this.pointsArray.length; i++) {
                if (this.pointsArray[i][0] == house) {
                    this.pointsArray[i][1].push(points);
                }
            }
        } else {
            if (this.checkIfAboveMax(points) != null) {
                console.log('Error');
            } else {
                for (let i = 0; i < this.pointsArray.length; i++) {
                    if (this.pointsArray[i][0] == house) {
                        this.pointsArray[i][1].push(points);
                    }
                }
            }
        }
    }

    checkIfAboveMax = (pointsToBeAdded) => {
        let addOutput = 0;
        for (let b = 0; b < this.pointsArray.length; b++) {
            addOutput = addOutput + this.adder.add(this.pointsArray[b][1]);
        }
        if (addOutput > this.totalPoints) {
            return;
        } else if ((addOutput + pointsToBeAdded) > this.totalPoints) {
            return;
        } else return null;
    }

    calculateMaxPoints = () => {
        let total = 0;
        for (let i = 0; i < this.sorted.length; i++) {
            total = total + this.sorted[i][1];
        }
        return total;
    }

    done = () => {
        if (this.dynamic) {
            for (let c = 0; c < this.pointsArray.length; c++) {
                let adderOutput = this.adder.add(this.pointsArray[c][1]);
                this.scoreArray.push([this.pointsArray[c][0], adderOutput])
            }
        } else {
            if (this.checkIfAboveMax(0) != null) {
                return;
            } else {
                for (let c = 0; c < this.pointsArray.length; c++) {
                    let adderOutput = this.adder.add(this.pointsArray[c][1]);
                    this.scoreArray.push([this.pointsArray[c][0], adderOutput])
                }
            }
        }
        this.sorted = this.sorter.sort(this.scoreArray);
        this.total = this.calculateMaxPoints();
        for (let i = 0; i < this.pointsArray.length; i++) {
            if (this.sorted[i][1] == 0) {
                this.percentageArray.push(
                    [
                        this.sorted[i][0],
                        0
                    ]
                )
            } else {
                this.percentageArray.push(
                    [
                        this.sorted[i][0],
                        Math.floor((this.sorted[i][1] / this.total) * 100)
                    ]
                )
            }
        }
        let percentage = {};
        for (let i = 0; i < this.percentageArray.length; i++) {
            percentage[this.percentageArray[i][0]] = this.percentageArray[i][1];
            this.result.push([this.percentageArray[i][0], this.percentageArray[i][1]]);
        }

        return [
            this.result,
            percentage
        ];
    }
}