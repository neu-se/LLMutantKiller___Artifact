import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should correctly handle purely imaginary numbers with a=0", () => {
    const result = new Complex(0, 0.5).acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-1.5707963267948966, 10);
  });
});