import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc function", () => {
  it("should correctly compute acsc for a non-zero complex number", () => {
    // acsc(c) = -i * log(i / c + sqrt(1 - 1 / c^2))
    // For a non-zero complex number, the original code computes d = a*a + b*b
    // and returns a result based on (d !== 0). The mutation changes this to (false),
    // which means it always takes the else branch (the fallback path).
    // For a simple real number like 2, acsc(2) = asin(1/2) = PI/6
    const c = new Complex(2, 0);
    const result = c.acsc();
    
    // acsc(2) should be asin(0.5) = PI/6 ≈ 0.5235987755982988
    expect(result.re).toBeCloseTo(Math.PI / 6, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});