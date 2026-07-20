import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should return the correct complex arccosecant for a real number", () => {
    // acsc(2) = asin(1/2) = π/6
    const result = new Complex(2, 0).acsc();
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(Math.PI / 6, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});