import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should return correct imaginary part sign for negative imaginary input", () => {
    const c = new Complex(0, -1);
    const result = c.acoth();
    expect(result.im).toBeGreaterThan(0);
  });
});