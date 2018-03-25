import * as p5 from 'p5';
import { Point } from "./point";
import { Perceptron } from "./perceptron";
import { params } from "./params";
import { lineY } from './lib';

const { canvasSize, learningRate, pointSize, numOfPoints } = params;

const percep = new Perceptron(learningRate, 3);
const points = Array(numOfPoints).fill(0).map(() => new Point());

const lp1 = new Point(1, lineY(1));
const lp2 = new Point(-1, lineY(-1));

// -- // -- // -- // // -- // -- // -- //
new p5((p5: p5) => {
    let trIdx = -1;

    p5.setup = () =>
        p5.createCanvas(canvasSize, canvasSize);

    p5.draw = () => {
        p5.background(255);
        p5.stroke(0, 0, 0);

        p5.line(lp1.xCords(), lp1.yCords(), lp2.xCords(), lp2.yCords());

        points.forEach((pt) => {
            pt.show(p5);
            drawGuess(p5, pt);
        });

        trIdx = trIdx >= points.length - 1 ? 0 : trIdx + 1;

        const tr = points[trIdx];
        percep.train([tr.x, tr.y, tr.bias], tr.label);
        percep.drawGuessLine(p5);

        const displayWeight = (wgIdx: number) => document.getElementById('w'+wgIdx)
            .innerHTML = `w${wgIdx}: ${percep.wghts[wgIdx].toFixed(5)}`

        percep.wghts.forEach((w, i) => displayWeight(i))
            
    };
})
// -- // -- // -- // // -- // -- // -- //

function drawGuess(p5: p5, pt: Point) {
    const inputs = [pt.x, pt.y, pt.bias];
    const target = pt.label;

    const guess = percep.guess(inputs);

    guess === target ? 
        p5.fill(0, 255, 0) : p5.fill(255, 0, 0);

    p5.noStroke(); 
    p5.ellipse(pt.xCords(), pt.yCords(), pointSize / 2);
}
