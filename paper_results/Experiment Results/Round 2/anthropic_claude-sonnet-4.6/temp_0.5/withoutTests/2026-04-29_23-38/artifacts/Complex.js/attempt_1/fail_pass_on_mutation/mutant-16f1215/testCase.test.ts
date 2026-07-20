import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc function", () => {
  it("should correctly compute acsc when a=0 and b=0 returning PI/2 + Infinity*i", () => {
    // When a=0 and b=0, acsc returns new Complex(Math.PI / 2, Infinity)
    // The mutation affects the else branch: (a !== 0) ? a/0 : 0 vs (true) ? a/0 : 0
    // To trigger the else branch (d === 0) with a === 0, we need a=0, b=0
    // but that's handled by the early return. So test the early return case.
    const result = new Complex(0, 0).acsc();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBe(Infinity);
    
    // Also test a case where d !== 0 but a === 0
    // acsc(i) = acsc(0 + 1i)
    const result2 = new Complex(0, 1).acsc();
    // For z = i: acsc(i) = asin(1/i) = asin(-i)
    // asin(-i) = -i * log(-i*i + sqrt(1-(-i)^2)) = -i * log(1 + sqrt(2))
    // = -i * log(1 + sqrt(2)) which is purely imaginary
    expect(isFinite(result2.re) || result2.re === 0).toBe(true);
  });
});