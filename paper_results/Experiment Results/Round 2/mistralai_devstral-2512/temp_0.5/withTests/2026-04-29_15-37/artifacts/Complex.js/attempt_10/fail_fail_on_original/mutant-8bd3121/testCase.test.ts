import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should fail when imaginary part is accessed incorrectly", () => {
    const z = new Complex(0.5, 0.5);
    const result = z.asech();
    // The mutation changes this['im'] to this[""] which will be undefined
    // This should cause the calculation to produce NaN results
    expect(isNaN(result.re)).toBe(true);
    expect(isNaN(result.im)).toBe(true);
  });
});