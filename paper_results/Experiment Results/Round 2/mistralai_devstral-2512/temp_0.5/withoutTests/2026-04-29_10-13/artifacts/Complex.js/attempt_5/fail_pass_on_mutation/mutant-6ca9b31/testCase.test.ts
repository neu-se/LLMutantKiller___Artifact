import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.toString()", () => {
  it("should correctly format complex numbers with negative imaginary parts when real part is zero", () => {
    const c = new Complex(0, -1);
    expect(c.toString()).toBe("-i");
  });
});