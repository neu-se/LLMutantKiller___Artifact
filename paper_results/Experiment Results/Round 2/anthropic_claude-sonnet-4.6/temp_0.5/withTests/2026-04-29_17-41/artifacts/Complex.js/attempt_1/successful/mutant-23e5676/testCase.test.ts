import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc function", () => {
  it("should correctly compute acsc(2) as the inverse cosecant of a real number", () => {
    // acsc(2) = asin(1/2) = π/6 ≈ 0.5235987755982988
    const result = new Complex(2, 0).acsc();
    
    // The expected value: acsc(2) = asin(1/2) = π/6
    const expected = Math.asin(0.5); // π/6 ≈ 0.5235987755982988
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});