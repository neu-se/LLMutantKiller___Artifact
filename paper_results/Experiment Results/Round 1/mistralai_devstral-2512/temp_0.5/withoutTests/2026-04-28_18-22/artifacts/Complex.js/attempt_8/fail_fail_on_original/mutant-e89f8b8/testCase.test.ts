import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc()", () => {
  it("should correctly compute the cosecant for a complex number with real=0.1 and imaginary=0.2", () => {
    const c = new Complex(0.1, 0.2);
    const result = c.csc();
    expect(result.re).toBeCloseTo(4.96031128347402, 10);
    expect(result.im).toBeCloseTo(-0.992062256694804, 10);
  });
});