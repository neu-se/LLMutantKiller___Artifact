import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for x = 0.0000001", () => {
    const x = 0.0000001;
    const c = new Complex(x, 0);
    const result = c.expm1();
    const expectedRe = Math.expm1(x);
    const expectedIm = 0;
    expect(result.re).toBeCloseTo(expectedRe, 15);
    expect(result.im).toBeCloseTo(expectedIm, 15);
  });
});