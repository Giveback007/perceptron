import * as p5 from 'p5';
import { Point } from "./point";
import { Perceptron } from "./perceptron";
import { params } from "./params";

const { canvasSize, learningRate, pointSize, numOfPoints } = params;

const percep = new Perceptron(learningRate);
const points = Array(numOfPoints).fill(0).map(() => new Point());

const f = (x: number) => 3 * x + 2;

const lp1 = new Point(1, 1);
const lp2 = new Point(-1, -1);

// -- // -- // -- // // -- // -- // -- //
new p5((p5: p5) => {

    let trIdx = -1;

    p5.setup = () => {
        p5.createCanvas(canvasSize, canvasSize);
    };

    p5.draw = () => {
        p5.background(255);
        p5.stroke(0, 0, 0);

        p5.line(lp1.xCords(), lp1.yCords(), lp2.xCords(), lp2.yCords());

        p5.stroke(0, 0, 255);
        p5.ellipse(lp1.xCords(), lp1.yCords(), 20, 20);
        p5.ellipse(lp2.xCords(), lp2.yCords(), 20, 20);

        points.forEach((pt) => {
            pt.show(p5);
            drawGuess(p5, pt);
        });

        trIdx = trIdx >= points.length - 1 ? 0 : trIdx + 1;

        const tr = points[trIdx];
        percep.train([tr.x, tr.y], tr.label);

    };
})
// -- // -- // -- // // -- // -- // -- //

function drawGuess(p5: p5, pt: Point) {
    const inputs = [pt.x, pt.y];
    const target = pt.label;

    const guess = percep.guess(inputs);

    guess === target ? 
        p5.fill(0, 255, 0) : p5.fill(255, 0, 0);

    p5.noStroke(); 
    p5.ellipse(pt.xCords(), pt.yCords(), pointSize / 2);
}