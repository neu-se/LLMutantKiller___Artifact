import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc function", () => {
  it("should correctly compute the inverse cosecant of a complex number", () => {
    // acsc(2) = asin(1/2) = π/6 ≈ 0.5235987755982988
    const result = new Complex(2, 0).acsc();
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(Math.PI / 6, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});