import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow with zero base", () => {
  it("0^2 should return zero", () => {
    // Original: a=0, b=0: first branch (a>0) false, second branch (a===0) true
    // goes to switch((2%4+4)%4 = 2): returns new Complex(-Math.pow(0,2), 0) = new Complex(-0, 0)
    // Mutated: a=0, b=0: first branch (a<=0) TRUE, returns new Complex(Math.pow(0,2), 0) = new Complex(0, 0)
    const result = new Complex(0, 0).pow(new Complex(2, 0));
    // Original returns -0 for re, mutated returns +0
    expect(1 / result.re).toBe(-Infinity); // checks for -0
    expect(result.im).toBe(0);
  });
});