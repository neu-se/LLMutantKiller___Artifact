import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech() method", () => {
  it("should correctly compute asech for complex numbers with non-zero imaginary parts", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asech();
    // The mutation changes this['im'] to this[""] which will be undefined
    // This will cause NaN in the calculation when trying to compute with undefined
    expect(result.re).toBeCloseTo(1.0612750619050357);
    expect(result.im).toBeCloseTo(-0.9045568943023813);
    expect(result.isNaN()).toBe(false);
  });
});