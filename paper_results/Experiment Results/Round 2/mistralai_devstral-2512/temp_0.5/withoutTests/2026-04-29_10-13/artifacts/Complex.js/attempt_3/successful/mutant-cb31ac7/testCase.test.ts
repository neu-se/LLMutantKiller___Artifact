import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function mutation", () => {
  it("should correctly compute expm1 for small imaginary values", () => {
    const x = 0.1;
    const complex = new Complex(0, x);
    const result = complex.expm1();
    const expectedRe = Math.cos(x) - 1;
    const expectedIm = Math.sin(x);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});