import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech() method", () => {
  it("should produce different results when imaginary part is accessed incorrectly", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asech();
    // The mutation changes this['im'] to this[""] which will be undefined
    // This should cause the calculation to fail differently
    expect(result.re).toBeCloseTo(1.0612750619050357);
    expect(result.im).toBeCloseTo(-0.9045568943023813);
    // This will fail on mutated code because undefined will produce NaN
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});