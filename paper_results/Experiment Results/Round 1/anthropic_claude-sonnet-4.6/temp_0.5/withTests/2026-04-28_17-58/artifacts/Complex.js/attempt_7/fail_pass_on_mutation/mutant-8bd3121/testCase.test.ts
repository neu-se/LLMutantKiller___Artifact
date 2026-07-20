import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech mutation detection", () => {
  it("asech should use the imaginary part correctly for complex input", () => {
    // With im = 3, original: b = 3, d = 4 + 9 = 13
    // Mutated: b = this[""] - if this is 0 or undefined, d = 4 + 0 = 4, giving wrong result
    const c = new Complex(2, 3);
    const result = c.asech();
    
    // Original: d = 13, new Complex(2/13, -3/13).acosh()
    // Mutated (b=0): d = 4, new Complex(2/4, 0).acosh() = new Complex(0.5, 0).acosh()
    const correctInverse = new Complex(2/13, -3/13);
    const expected = correctInverse.acosh();
    
    expect(result.re).toBeCloseTo(expected.re, 8);
    expect(result.im).toBeCloseTo(expected.im, 8);
  });
});