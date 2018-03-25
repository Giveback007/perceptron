import * as p5 from 'p5';
import { params } from './params';

const P5 = new p5(() => {});

export const random = P5.random;
export const map = P5.map;
export const lineY = params.line;