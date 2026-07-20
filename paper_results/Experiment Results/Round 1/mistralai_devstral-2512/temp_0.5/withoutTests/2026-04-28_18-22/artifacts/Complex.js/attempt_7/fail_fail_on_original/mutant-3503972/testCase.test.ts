import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should return negative imaginary part for negative imaginary input", () => {
    const c = new Complex(0, -1);
    const result = c.acsch();
    expect(result.im).toBeLessThan(0);
  });
});