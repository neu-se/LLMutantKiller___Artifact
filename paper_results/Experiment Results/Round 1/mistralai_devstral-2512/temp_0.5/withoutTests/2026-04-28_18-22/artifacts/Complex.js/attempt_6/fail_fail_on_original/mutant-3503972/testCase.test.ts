import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should return correct sign for imaginary part with negative imaginary input", () => {
    const c = new Complex(0, -1);
    const result = c.acsch();
    const originalSign = Math.sign(result.im);
    const mutatedSign = Math.sign(new Complex(0, -1).acsch().im);
    expect(originalSign).toBe(-1);
    expect(mutatedSign).toBe(1);
  });
});