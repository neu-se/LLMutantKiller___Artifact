import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should correctly handle complex numbers with a=0 and non-zero b", () => {
    const result = new Complex(0, 2).acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-1.5707963267948966, 10);
  });
});