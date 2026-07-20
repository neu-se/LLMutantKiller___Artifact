import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should produce correct real and imaginary parts for asinh(1+1i)", () => {
    const c = new Complex(1, 1);
    const result = c.asinh();
    // The mutation changes res['re'] = -res['im'] to res['re'] = -res[""]
    // This will cause the real part to be NaN in the mutated version
    expect(result.re).toBeCloseTo(0.661474941935232, 10);
    expect(result.im).toBeCloseTo(1.0612750619050357, 10);
  });
});