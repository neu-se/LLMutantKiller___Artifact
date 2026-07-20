import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sec function", () => {
  it("should correctly compute sec(1 + 2i) using the formula with 2*b multiplication", () => {
    // sec(z) uses: var d = 0.5 * cosh(2 * b) + 0.5 * Math.cos(2 * a)
    // The mutation changes 2 * b to 2 / b
    // For z = 1 + 2i, a=1, b=2
    // Original: d = 0.5 * cosh(4) + 0.5 * cos(2)
    // Mutated:  d = 0.5 * cosh(1) + 0.5 * cos(2)  (2/2 = 1 instead of 2*2 = 4)
    
    const z = new Complex(1, 2);
    const result = z.sec();
    
    // Compute expected values manually
    // sec(a + bi) = cos(a)*cosh(b)/d + i*sin(a)*sinh(b)/d
    // where d = 0.5*cosh(2b) + 0.5*cos(2a)
    const a = 1;
    const b = 2;
    const cosh2b = Math.cosh(2 * b);
    const cos2a = Math.cos(2 * a);
    const d = 0.5 * cosh2b + 0.5 * cos2a;
    const expectedRe = Math.cos(a) * Math.cosh(b) / d;
    const expectedIm = Math.sin(a) * Math.sinh(b) / d;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});