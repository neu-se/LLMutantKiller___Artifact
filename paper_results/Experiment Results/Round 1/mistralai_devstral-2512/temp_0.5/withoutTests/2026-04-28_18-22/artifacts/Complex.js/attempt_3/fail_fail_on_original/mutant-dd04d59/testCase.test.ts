import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should correctly swap real and imaginary parts in the result", () => {
    const c = new Complex(1, 1);
    const result = c.asinh();
    // The mutation changes res['re'] = -res['im'] to res['re'] = -res[""]
    // This will cause the real part to be incorrect while imaginary part remains correct
    // We test that the real part is not equal to the negative of an empty string (which would be NaN)
    expect(result.re).not.toBeNaN();
    expect(result.im).toBeCloseTo(1.0612750619050357, 10);
  });
});