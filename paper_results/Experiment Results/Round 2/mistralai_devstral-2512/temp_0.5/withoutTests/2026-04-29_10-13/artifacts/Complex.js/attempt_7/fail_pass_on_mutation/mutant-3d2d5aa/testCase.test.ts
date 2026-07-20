import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should correctly handle division by zero for non-zero imaginary component", () => {
    const result = new Complex(0, 1).acoth();
    expect(result.re).toBe(0);
    expect(result.im).toBe(-Math.PI / 4);
  });
});