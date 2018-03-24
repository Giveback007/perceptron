import { random } from "./lib";

export class Point {
    x: number;
    y: number;

    label: 1 | -1;

    constructor(max_x, max_y) {
        this.x = random(0, max_x);
        this.y = random(0, max_y);

        this.label = this.y > this.x ? 1 : -1;
    }

    show(draw) {
        draw.stroke(0, 0, 0);
        this.label === 1 ? draw.fill(255, 255, 255) : draw.fill(0, 0, 0);
        draw.ellipse(this.x, this.y, 8, 8);
    }
}