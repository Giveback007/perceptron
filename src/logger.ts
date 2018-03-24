export function logTraining(inp: number[], target: 1 | -1, guess: 1 | -1, error: number, wghts: number[]) {

    console.log("inpt:", ["[x] " + inp[0].toFixed(2), "[y] " + inp[1].toFixed(2)]);
    console.log("wght:", ["xW:  " + wghts[0].toFixed(2), "yW: " + wghts[1].toFixed(2)]);
    console.log("  * :", [
        "x-> " + (wghts[0] * inp[0]).toFixed(2),
        "y-> " + (wghts[1] * inp[0]).toFixed(2),
    ]);

    const n = (inp[0] * wghts[0]) + (inp[1] * wghts[1]);
    console.log(`
          [x](${inp[0].toFixed(2)} * ${wghts[0].toFixed(2)})
        + [y](${inp[1].toFixed(2)} * ${wghts[1].toFixed(2)})
        = ${(n).toFixed(2)}`);

    console.log(`
        ${(n).toFixed(2)} > 0 ? --> ${n > 0 ? 1 : -1} (guess)`);
    console.log("guess:", guess, "target:", target);
    console.log("outcome:", !error, "err:", error);
    console.log("--- --- --- --- --- --- --- --- --- ---");
}
