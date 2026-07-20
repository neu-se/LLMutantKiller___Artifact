import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc()", () => {
  it("should correctly compute the cosecant for a complex number with real=0.5 and imaginary=1", () => {
    const c = new Complex(0.5, 1);
    const result = c.csc();
    expect(result.re).toBeCloseTo(0.4592823123381127, 10);
    expect(result.im).toBeCloseTo(-0.5485181605700715, 10);
  });
});