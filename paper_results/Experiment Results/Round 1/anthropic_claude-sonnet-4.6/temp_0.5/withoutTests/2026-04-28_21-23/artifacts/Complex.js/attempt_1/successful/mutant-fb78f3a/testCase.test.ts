import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should return Complex(0, Infinity) when both real and imaginary parts are zero", () => {
    // When a === 0 && b === 0, asec(0) should return Complex(0, Infinity)
    // The original code checks: if (a === 0 && b === 0)
    // The mutated code checks: if (a !== 0 && b === 0)
    // So for input (0, 0), original returns Complex(0, Infinity), mutated does not
    const result = new Complex(0, 0).asec();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Infinity);
  });
});