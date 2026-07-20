import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow with fully imaginary base", () => {
  it("should return exact result for (i)^1 using the imaginary base switch case", () => {
    // (0 + 1i)^1: switch case 1 returns new Complex(0, Math.pow(1, 1)) = new Complex(0, 1)
    // The general formula: arg=pi/2, loh=logHypot(0,1)=0, a=exp(0)=1, b=1*pi/2
    // result re = cos(pi/2) which is NOT exactly 0 due to floating point
    // result im = sin(pi/2) = 1
    const result = new Complex(0, 1).pow(1);
    expect(result.re).toBe(0);
    expect(result.im).toBe(1);
  });
});