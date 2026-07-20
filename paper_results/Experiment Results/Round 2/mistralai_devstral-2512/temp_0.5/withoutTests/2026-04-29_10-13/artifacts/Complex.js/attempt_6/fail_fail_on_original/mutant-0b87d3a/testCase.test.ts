import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should return correct value for complex number (0.5, 0.5)", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.8473, 4);
    expect(result.im).toBeCloseTo(-0.5493, 4);
  });
});