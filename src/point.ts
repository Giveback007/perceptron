import { params } from './params';
import { random, map } from "./lib";

const { pointSize, canvasSize } = params;

export class Point {
    label: 1 | -1;

    x: number;
    y: number;

    constructor(x?: number, y?: number) {
        this.x = x !== undefined ? x : random(-1, 1);
        this.y = y !== undefined ? y : random(-1, 1);

        this.label = this.y > this.x ? 1 : -1;
    }

    xCords = () => map(this.x, -1, 1, 0, canvasSize);
    yCords = () => map(this.y, -1, 1, canvasSize, 0);

    show(p5: p5) {
        p5.stroke(0, 0, 0);
        this.label === 1 ? p5.fill(0, 0, 0) : p5.fill(255, 255, 255);
        
        p5.ellipse(this.xCords(), this.yCords(), pointSize, pointSize);
    }
}