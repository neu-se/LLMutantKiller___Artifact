import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function mutation", () => {
  it("should correctly compute expm1 for purely imaginary numbers", () => {
    const c = new Complex("0+0.1i");
    const result = c.expm1();
    const expectedIm = Math.exp(0) * Math.sin(0.1);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});