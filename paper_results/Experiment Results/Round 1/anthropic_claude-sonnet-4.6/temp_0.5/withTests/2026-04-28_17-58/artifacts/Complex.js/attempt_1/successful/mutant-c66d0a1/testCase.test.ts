import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc method", () => {
  it("should correctly compute acsc for a non-zero complex number", () => {
    // acsc(c) = -i * log(i / c + sqrt(1 - 1 / c^2))
    // For a non-zero complex number, d = a*a + b*b != 0
    // In the original code: var d = a * a + b * b; return (d !== 0) ? new Complex(a/d, -b/d).asin() : ...
    // In the mutated code: return (false) which always takes the else branch
    
    // Use a simple real number: acsc(2) = asin(1/2) = pi/6
    const c = new Complex(2, 0);
    const result = c.acsc();
    
    // acsc(2) = asin(0.5) = pi/6 ≈ 0.5235987755982988
    const expected = Math.asin(0.5);
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});