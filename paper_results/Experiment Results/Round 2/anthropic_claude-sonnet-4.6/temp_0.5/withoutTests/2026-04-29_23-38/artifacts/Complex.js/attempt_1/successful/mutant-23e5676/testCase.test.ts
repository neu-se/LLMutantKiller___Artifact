import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc function", () => {
  it("should correctly compute acsc for a real number greater than 1", () => {
    // acsc(2) = asin(1/2) = π/6 ≈ 0.5235987755982988
    const result = new Complex(2, 0).acsc();
    
    // The mutation changes `a / d` to `a * d` in the acsc function
    // For z = 2+0i: d = a*a + b*b = 4, a/d = 2/4 = 0.5, a*d = 2*4 = 8
    // With original: acsc(2) = asin(0.5 + 0i) = π/6
    // With mutation: acsc(2) = asin(8 + 0i) which gives a very different result
    
    const expected = Math.PI / 6; // ≈ 0.5235987755982988
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});