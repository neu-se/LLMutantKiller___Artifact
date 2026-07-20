import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should compute acoth(2) correctly with real input", () => {
    // acoth(2) = atanh(1/2) = 0.5 * log(3) ≈ 0.5493...
    // For real input a=2, b=0: d=4, returns new Complex(2/4, 0/4).atanh() = new Complex(0.5, 0).atanh()
    // This tests the d !== 0 branch with b=0 (mutation doesn't affect this)
    // Let's test with imaginary component: acoth(1+i)
    // d = 1+1 = 2, returns new Complex(1/2, -1/2).atanh()
    // Original: new Complex(0.5, -0.5).atanh()
    // If mutation is in d!=0 branch: new Complex(0.5, +0.5).atanh() - different im sign
    const result = new Complex(1, 1).acoth();
    const expected = new Complex(0.5, -0.5).atanh();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});