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

// Perceptron Algorithm
/*
    1. For every input, multiply that input by its weight.
    2. Sum all of the weighted inputs.
    3. Compute the output of the perceptron base on the sum
    passed through an activation function (the sign of the sum);
*/

// Supervised Learning
/*
    1. Provide the perceptron with inputs for which the is a known answer.
    2. Ask the perceptron to guess an answer.
    3. Compute the error. (Did it get the answer right or wrong?)
    4. Adjust all the weights according to the error.
    5. Return to Step 1 and repeat!
*/