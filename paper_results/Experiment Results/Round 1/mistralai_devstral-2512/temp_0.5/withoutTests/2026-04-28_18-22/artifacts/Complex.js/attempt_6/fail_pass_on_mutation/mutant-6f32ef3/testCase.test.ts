import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number toString", () => {
  it("should correctly format complex number with zero real part and negative imaginary part", () => {
    const c = new Complex(0, -0.5);
    expect(c.toString()).toBe("-0.5i");
  });
});