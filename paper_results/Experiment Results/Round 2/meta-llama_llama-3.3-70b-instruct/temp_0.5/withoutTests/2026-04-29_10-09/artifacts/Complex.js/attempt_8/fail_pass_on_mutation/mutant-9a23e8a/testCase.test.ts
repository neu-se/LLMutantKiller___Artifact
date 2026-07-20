import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js", () => {
  it("should calculate acsch correctly", () => {
    const complex = new Complex(2, 0);
    const originalResult = new Complex(2, 0).acsch();
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(originalResult.re);
    expect(result.im).toBeCloseTo(originalResult.im);
  });
});