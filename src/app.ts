import * as p5 from 'p5';
import { Point } from "./point";
import { Perceptron } from "./perceptron";
import { params } from "./params";

const percep = new Perceptron(0.002);
const points = Array(100).fill(0)
    .map(() => new Point(params.size, params.size));

// -- // -- // -- // // -- // -- // -- //
const sketch = (p: p5) => {

    let trIdx = -1;

    p.setup = () => {
        p.createCanvas(params.size, params.size);
    };

    p.draw = () => {
        p.background(255);
        p.stroke(0, 0, 0);
        p.line(0, 0, p.width, p.height);
        points.forEach((pt) => pt.show(p));

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
const draw: p5 = new p5(sketch);
