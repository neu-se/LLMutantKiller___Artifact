import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech() method", () => {
  it("should produce different results when imaginary part is accessed incorrectly", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.sech();
    // This test verifies the mutation by checking if the imaginary part affects the result
    // The mutation changes this['im'] to this[""] which should cause NaN or incorrect values
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});