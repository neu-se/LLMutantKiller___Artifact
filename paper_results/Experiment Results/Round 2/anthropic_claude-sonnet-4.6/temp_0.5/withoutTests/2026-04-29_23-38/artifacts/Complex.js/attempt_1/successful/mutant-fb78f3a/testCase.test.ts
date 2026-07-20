import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should return Complex(0, Infinity) when called with zero (0 + 0i)", () => {
    // The original code checks: if (a === 0 && b === 0) { return new Complex(0, Infinity); }
    // The mutated code checks: if (a !== 0 && b === 0) { ... }
    // For input (0, 0): original returns Complex(0, Infinity), mutant does not
    const result = new Complex(0, 0).asec();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Infinity);
  });
});