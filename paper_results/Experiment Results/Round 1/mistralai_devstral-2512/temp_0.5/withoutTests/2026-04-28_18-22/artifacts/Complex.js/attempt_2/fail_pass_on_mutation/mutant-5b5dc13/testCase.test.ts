import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should correctly handle real numbers with a=0", () => {
    const result = new Complex(0, 1).acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});