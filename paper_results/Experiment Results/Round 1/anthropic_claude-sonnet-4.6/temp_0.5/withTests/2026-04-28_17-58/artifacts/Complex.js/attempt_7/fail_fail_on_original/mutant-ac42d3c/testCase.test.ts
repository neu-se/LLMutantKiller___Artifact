import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan", () => {
  it("atan of (0, -1) multiplied by i should give real infinity", () => {
    const result = new Complex(0, -1).atan();
    // Original: Complex(0, -Infinity) * i = Complex(0*0 - (-Inf)*1, 0*1 + (-Inf)*0) = Complex(Inf, 0)  
    // Check the imaginary part is exactly -Infinity
    const negInfCheck = result.mul(new Complex(0, 1));
    expect(negInfCheck.re).toBe(Infinity);
    expect(negInfCheck.im).toBe(0);
  });
});