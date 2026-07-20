import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number toString", () => {
  it("should correctly format negative imaginary part with zero real part", () => {
    const c = new Complex(0, -1);
    expect(c.toString()).toBe("-i");
  });
});