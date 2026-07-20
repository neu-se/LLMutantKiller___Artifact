import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should return correct result for input (sqrt(2), sqrt(2))", () => {
    const c = new Complex(Math.sqrt(2), Math.sqrt(2));
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.36642883798682263);
    expect(result.im).toBeCloseTo(-0.45227844715119064);
  });
});