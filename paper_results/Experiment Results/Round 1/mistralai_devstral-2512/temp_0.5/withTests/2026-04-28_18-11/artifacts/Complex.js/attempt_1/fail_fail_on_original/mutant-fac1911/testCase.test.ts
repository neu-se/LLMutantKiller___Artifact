import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should correctly compute the inverse cosecant for a non-zero imaginary component", () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.337, 3);
    expect(result.im).toBeCloseTo(-0.337, 3);
  });
});