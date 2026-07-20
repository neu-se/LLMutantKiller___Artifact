import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should detect division by zero in mutated acsc calculation", () => {
    const c = new Complex(0, 1);
    const result = c.acsc();
    // The mutation changes a*a to a/a, which becomes NaN when a=0
    // In the original code, this should produce a valid result
    // In the mutated code, this should produce NaN
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});