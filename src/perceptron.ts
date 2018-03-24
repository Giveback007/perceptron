import { random } from "./lib";
import { params } from './params';
import { logTraining } from "./logger";

export class Perceptron {
    wghts: number[];
    lr: number;

    constructor(learningRate: number) {
        this.lr = learningRate;
        this.wghts = Array(2).fill(0).map(() => random(-1, 1));
    }

    // This is the activation function
    activate = (n: number) => (n > 0 ? 1 : -1);

    guess(inputs: number[]) {
        
        const sum = inputs.reduce((a, b, idx) =>
            a + (b * this.wghts[idx]), 0);

        return this.activate(sum);
    }

    train(inp: number[], target: 1 | -1) {
        const guess = this.guess(inp);
        const error = target - guess;

        if (params.log) logTraining(inp, target, guess, error, this.wghts);

        this.wghts.forEach((w, i) =>
            this.wghts[i] += error * inp[i] * this.lr);

    }
}
