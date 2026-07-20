import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should correctly handle division in acsc calculation for complex numbers with zero real part", () => {
    const c = new Complex(0, 1);
    const result = c.acsc();
    // The mutation changes a*a to a/a, which becomes NaN when a=0
    // This should cause the result to be NaN in the mutated version
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});