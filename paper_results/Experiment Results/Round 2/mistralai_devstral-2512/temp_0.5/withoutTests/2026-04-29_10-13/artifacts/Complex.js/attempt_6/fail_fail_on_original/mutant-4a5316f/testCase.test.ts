import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should return correct imaginary part sign for purely imaginary negative input", () => {
    const c = new Complex(0, -1);
    const result = c.acoth();
    expect(result.im).toBeLessThan(0);
  });
});