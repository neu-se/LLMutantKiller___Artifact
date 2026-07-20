import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc function", () => {
  it("should return a complex number with re=0 when input is (0, subnormal) causing d to underflow", () => {
    // With a=0, b=5e-324 (MIN_VALUE): d = a*a + b*b = 0 (underflow)
    // The else branch is taken. With a=0:
    // Original: re = (a !== 0) ? a/0 : 0 = 0
    // Mutated:  re = (true) ? a/0 : 0 = 0/0 = NaN
    // Then asin(0, ...) is called
    // We check that the result from original has re !== NaN
    const result = new Complex(0, 5e-324).acsc();
    // In original code, the else branch constructs Complex(0, im).asin()
    // In mutated code, it constructs Complex(NaN, im).asin() which gives NaN
    expect(result.re).not.toBeNaN();
  });
});