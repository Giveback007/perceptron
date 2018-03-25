import { Point } from './point';
import { random } from "./lib";
import { params } from './params';
import { logTraining } from "./logger";

export class Perceptron {
    wghts: number[];
    lr: number;

    constructor(learnRate: number, n: number) {
        this.lr = learnRate;
        this.wghts = Array(n).fill(0).map(() => random(-1, 1));
    }

    // This is the activation function
    activate = (n: number) => (n > 0 ? 1 : -1);

    guess(inputs: number[]) {
        const sum = inputs.reduce((a, b, idx) =>
            a + (b * this.wghts[idx]), 0);

        return this.activate(sum);
    }

    drawGuessLine(p5: p5) {
        const lineFunct = (x) => 
            -1 * (this.wghts[2] / this.wghts[1]) - (this.wghts[0] / this.wghts[1]) * x

        const p1 = new Point(-1, lineFunct(-1));
        const p2 = new Point(1, lineFunct(1));
        p5.stroke(0, 0, 0);
        p5.line(p1.xCords(), p1.yCords(), p2.xCords(), p2.yCords());
    }

    errCount = 0;
    totalAdjust = 0;
    minusAdjust = 0;
    plusAdjust = 0;    

    train(inp: number[], target: 1 | -1) {
        const guess = this.guess(inp);
        const error = target - guess;

        if (params.log) logTraining(inp, target, guess, error, this.wghts);

        this.wghts.forEach((w, i) => {
            const adjust = error * inp[i] * this.lr;
            this.wghts[i] += adjust;

            if (adjust) this.errCount++;
        
            adjust > 0 ? this.plusAdjust += adjust : this.minusAdjust += adjust;
            this.totalAdjust += adjust;
            document.getElementById('errAvg').innerHTML = `
                <br/> + adjust: ${this.plusAdjust}
                <br/> - adjust: ${this.minusAdjust}
                <br/> total-change: ${this.totalAdjust}
                <br/> err-count: ${this.errCount}`;           
        })
            
    }
}
