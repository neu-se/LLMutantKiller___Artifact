import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should expose the division mutation in acsc calculation for non-zero imaginary component", () => {
    const c = new Complex(1, 2);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.217, 3);
    expect(result.im).toBeCloseTo(-0.312, 3);
  });
});