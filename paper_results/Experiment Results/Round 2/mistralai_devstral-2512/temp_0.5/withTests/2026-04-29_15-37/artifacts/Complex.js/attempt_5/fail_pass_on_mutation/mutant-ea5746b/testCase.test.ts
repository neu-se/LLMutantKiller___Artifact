import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function mutation", () => {
  it("should correctly compute expm1 for purely imaginary numbers", () => {
    const x = 0.1;
    const c = new Complex(0, x);
    const result = c.expm1();
    // For exp(i*x) - 1, the real part should be cos(x) - 1
    const expectedReal = Math.cos(x) - 1;
    expect(result.re).toBeCloseTo(expectedReal, 10);
    // The imaginary part should be sin(x)
    const expectedImag = Math.sin(x);
    expect(result.im).toBeCloseTo(expectedImag, 10);
  });
});