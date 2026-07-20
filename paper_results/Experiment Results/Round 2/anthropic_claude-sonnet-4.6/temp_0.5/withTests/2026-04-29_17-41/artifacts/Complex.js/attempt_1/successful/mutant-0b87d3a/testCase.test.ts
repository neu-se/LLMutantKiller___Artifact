import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should correctly compute acsc for a non-zero complex number", () => {
    // For a non-zero complex number, d = a*a + b*b != 0
    // Original: return (d !== 0) ? new Complex(a/d, -b/d).asin() : ...
    // Mutated:  return (d === 0) ? new Complex(a/d, -b/d).asin() : ...
    // When d != 0, original takes the first branch, mutated takes the second branch
    // This will produce different results

    const c = new Complex(2, 1);
    const result = c.acsc();

    // acsc(2+i) should be a well-defined complex number
    // We verify it matches the expected mathematical result
    // acsc(z) = asin(1/z) = asin(z_inv)
    // z_inv = (2-i)/(4+1) = (2/5, -1/5)
    const zInv = new Complex(2 / 5, -1 / 5);
    const expected = zInv.asin();

    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});