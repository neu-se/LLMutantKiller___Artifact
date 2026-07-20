import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("acoth with subnormal b where d underflows to 0 should not be NaN", () => {
    // b = 5e-324 (smallest positive double), b*b underflows to 0
    // a = 0, so d = 0, bypasses early return since b !== 0
    // Original: new Complex(0, -b/0) = new Complex(0, -Infinity)
    // Mutated:  new Complex(0, +b/0) = new Complex(0, +Infinity)
    const result = new Complex(0, 5e-324).acoth();
    const resultNeg = new Complex(0, -5e-324).acoth();
    // These should be negatives of each other (conjugate symmetry)
    // If mutation flips sign, result and resultNeg will have same im sign
    expect(Math.sign(result.im)).not.toBe(Math.sign(resultNeg.im));
  });
});