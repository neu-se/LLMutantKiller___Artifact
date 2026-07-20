import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should correctly compute the arc cosecant for a complex number with specific real and imaginary parts", () => {
    const c = new Complex(2, 1);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.226, 3);
    expect(result.im).toBeCloseTo(-0.113, 3);
  });
});