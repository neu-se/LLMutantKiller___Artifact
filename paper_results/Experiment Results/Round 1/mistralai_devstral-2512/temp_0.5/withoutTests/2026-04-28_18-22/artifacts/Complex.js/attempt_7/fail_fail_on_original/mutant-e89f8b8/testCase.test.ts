import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc()", () => {
  it("should correctly compute the cosecant for a complex number with real=0.5 and imaginary=0.5", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.csc();
    expect(result.re).toBeCloseTo(1.0782296946540224, 10);
    expect(result.im).toBeCloseTo(-0.383512578502305, 10);
  });
});