import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc method", () => {
  it("should correctly compute acsc for a non-zero complex number", () => {
    // acsc(2) should return asin(1/2) = PI/6 ≈ 0.5236
    const c = new Complex(2, 0);
    const result = c.acsc();
    
    // For real input 2, acsc(2) = asin(0.5) = PI/6
    const expected = Math.asin(0.5);
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});