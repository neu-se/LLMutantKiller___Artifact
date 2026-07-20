import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc function", () => {
  it("should correctly compute acsc for a real number greater than 1", () => {
    // acsc(2) = asin(1/2) = π/6 ≈ 0.5235987755982988
    const result = new Complex(2, 0).acsc();
    
    // The mutation changes `a / d` to `a * d` in the acsc method
    // For z = 2 + 0i:
    //   d = a*a + b*b = 4 + 0 = 4
    //   Original: new Complex(a/d, -b/d) = new Complex(2/4, 0) = new Complex(0.5, 0)
    //   Mutated:  new Complex(a*d, -b/d) = new Complex(2*4, 0) = new Complex(8, 0)
    // Then .asin() is called on that result
    // Original: asin(0.5) = π/6 ≈ 0.5236
    // Mutated:  asin(8) which is a complex number, very different result
    
    expect(result.re).toBeCloseTo(Math.PI / 6, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});