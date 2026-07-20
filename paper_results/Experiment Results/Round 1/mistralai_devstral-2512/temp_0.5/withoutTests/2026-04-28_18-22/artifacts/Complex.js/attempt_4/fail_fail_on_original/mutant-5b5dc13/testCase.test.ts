import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should correctly handle complex numbers with a=0 and b=0", () => {
    const result = new Complex(0, 0).acsch();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});