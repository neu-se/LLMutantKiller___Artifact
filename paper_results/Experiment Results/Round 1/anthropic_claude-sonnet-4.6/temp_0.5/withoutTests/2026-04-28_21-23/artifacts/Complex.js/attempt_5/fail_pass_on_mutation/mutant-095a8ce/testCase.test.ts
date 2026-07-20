import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc method", () => {
  it("should correctly compute acsc for a real number greater than 1", () => {
    // acsc(2) = asin(1/2) = PI/6
    const c = new Complex(2, 0);
    const result = c.acsc();
    
    // acsc(2) = asin(0.5) = PI/6 ≈ 0.5236
    expect(result.re).toBeCloseTo(Math.PI / 6, 5);
    expect(result.im).toBeCloseTo(0, 10);
  });
});