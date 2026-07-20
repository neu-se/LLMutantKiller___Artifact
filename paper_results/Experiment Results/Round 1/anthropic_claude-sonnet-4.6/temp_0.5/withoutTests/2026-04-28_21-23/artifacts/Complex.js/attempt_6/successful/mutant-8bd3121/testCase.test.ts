import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch function", () => {
  it("should compute acsch of a complex number correctly", () => {
    // acsch(1) = log(1 + sqrt(2)) ≈ 0.8813735870195430
    const c = new Complex(1, 0);
    const result = c.acsch();
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(0.8813735870195430, 5);
    expect(result.im).toBeCloseTo(0, 5);
  });
});