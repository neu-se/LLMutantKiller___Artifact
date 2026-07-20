import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("should correctly compute acsc of a complex number with non-zero imaginary part", () => {
    // acsc(1 + i) should use -b/d in the intermediate computation
    // Original: new Complex(a/d, -b/d).asin() where a=1, b=1, d=2 => Complex(0.5, -0.5).asin()
    // Mutated:  new Complex(a/d, +b/d).asin() where a=1, b=1, d=2 => Complex(0.5, +0.5).asin()
    const z = new Complex(1, 1);
    const result = z.acsc();

    // Compute expected value: acsc(1+i) = asin(1/(1+i)) = asin((1-i)/2) = asin(0.5 - 0.5i)
    // asin(0.5 - 0.5i) should have a specific imaginary part
    // We verify against the correct formula result
    const expected = new Complex(0.5, -0.5).asin();

    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);

    // The mutated version would produce asin(0.5 + 0.5i) which has opposite imaginary sign
    const mutatedExpected = new Complex(0.5, 0.5).asin();
    
    // Ensure the correct result is different from the mutated result
    // (specifically the imaginary part should differ)
    expect(Math.abs(result.im - mutatedExpected.im)).toBeGreaterThan(1e-10);
  });
});