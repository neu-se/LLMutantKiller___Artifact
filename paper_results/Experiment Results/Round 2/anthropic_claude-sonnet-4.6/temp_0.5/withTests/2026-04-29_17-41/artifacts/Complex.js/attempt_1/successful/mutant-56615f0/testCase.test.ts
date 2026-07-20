import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch function", () => {
  it("should correctly compute the inverse hyperbolic cosecant of a real number", () => {
    const c = new Complex(1, 0);
    const result = c.acsch();
    
    // acsch(1) = log(1 + sqrt(2)) ≈ 0.8813735870195430
    const expected = Math.log(1 + Math.sqrt(2));
    
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});