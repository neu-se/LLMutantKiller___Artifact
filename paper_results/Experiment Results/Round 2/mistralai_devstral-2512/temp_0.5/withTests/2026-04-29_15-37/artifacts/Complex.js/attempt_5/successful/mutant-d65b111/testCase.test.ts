import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should correctly compute asech for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asech();
    expect(result.re).toBeCloseTo(1.0612750619050357, 10);
    expect(result.im).toBeCloseTo(-0.9045568943023813, 10);
  });
});