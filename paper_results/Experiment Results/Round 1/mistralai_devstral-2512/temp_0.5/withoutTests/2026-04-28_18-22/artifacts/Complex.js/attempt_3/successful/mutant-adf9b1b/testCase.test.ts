import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute expm1 for purely imaginary numbers", () => {
    const y = 0.1;
    const c = new Complex(0, y);
    const result = c.expm1();
    // For purely imaginary input (0 + yi), expm1 should be:
    // expm1(0 + yi) = cosm1(y) + i*sin(y)
    // So the real part should be cosm1(y) = cos(y) - 1
    const expectedReal = Math.cos(y) - 1;
    expect(result.re).toBeCloseTo(expectedReal, 10);
  });
});