import * as p5 from "p5";

const height = 200;
const width = 200;

const random = (min, max) => Math.random() * (max - min + 1) + min;

// -- // -- // -- // // -- // -- // -- //
const sketch = (p: p5) => {

    let trIdx = -1;

    p.setup = () => {
        p.createCanvas(height, width);
    };

    p.draw = () => {
        p.background(255);
        p.stroke(0, 0, 0);
        p.line(0, 0, p.width, p.height);
        points.forEach((pt) => pt.show());

        points.forEach((pt, idx) => {
            const inputs = [pt.x, pt.y];
            const target = pt.label;

            // percep.train(inputs, target);
            const guess = percep.guess(inputs);
            if (guess === target) {
                p.fill(0, 255, 0);
            } else {
                p.fill(255, 0, 0);
            }

            p.noStroke();
            p.ellipse(pt.x, pt.y, 6, 6);
        });

        trIdx = trIdx >= points.length - 1 ? 0 : trIdx + 1;

        const tr = points[trIdx];
        percep.train([tr.x, tr.y], tr.label);

    };
};
// -- // -- // -- // // -- // -- // -- //
const draw = new p5(sketch);

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

class Perceptron {
    wgh: number[];
    lr = 0.002;

    constructor() {
        this.wgh = Array(2).fill(0).map(() => random(-1, 1));
    }

    // This is the activation function
    activate = (n: number) => (n > 0 ? 1 : -1);

    guess(inputs: number[]) {
        const sum = inputs.reduce((a, b, idx) =>
            a + (b * this.wgh[idx]), 0);

        return this.activate(sum);
    }

    train(inp: number[], target: number) {
        const guess = this.guess(inp);
        const error = target - guess;

        console.log("inpt:", ["[x] " + inp[0].toFixed(2), "[y] " + inp[1].toFixed(2)]);
        console.log("wght:", ["xW:  " + this.wgh[0].toFixed(2), "yW: " + this.wgh[1].toFixed(2)]);
        console.log("  * :", [
            "x-> " + (this.wgh[0] * inp[0]).toFixed(2),
            "y-> " + (this.wgh[1] * inp[0]).toFixed(2),
        ]);

        const n = (inp[0] * this.wgh[0]) + (inp[1] * this.wgh[1]);
        console.log(`
          [x](${inp[0].toFixed(2)} * ${this.wgh[0].toFixed(2)})
        + [y](${inp[1].toFixed(2)} * ${this.wgh[1].toFixed(2)})
        = ${(n).toFixed(2)}`);

        console.log(`
        ${(n).toFixed(2)} > 0 ? --> ${n > 0 ? 1 : -1} (guess)`);
        console.log("guess:", guess, "target:", target);
        console.log("outcm:", !error, "err:", error);

        this.wgh.forEach((w, i) =>
            this.wgh[i] += error * inp[i] * this.lr);
        console.log("--- --- --- --- --- --- --- --- --- ---");
    }
}

class Point {
    x = random(0, height);
    y = random(0, width);

    label = this.y > this.x ? 1 : -1;

    show() {
        draw.stroke(0, 0, 0);
        this.label === 1 ? draw.fill(255, 255, 255) : draw.fill(0, 0, 0);
        draw.ellipse(this.x, this.y, 8, 8);
    }
}

const points = Array(100).fill(0).map(() => new Point());
const percep = new Perceptron();
