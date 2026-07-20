import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should return correct imaginary part sign for negative imaginary input", () => {
    const c = new Complex(0, -1);
    const result = c.acsch();
    // The original code should produce positive infinity for negative imaginary input
    // due to the -b/0 operation (negative divided by zero becomes positive infinity)
    expect(result.im).toBe(Infinity);
  });
});