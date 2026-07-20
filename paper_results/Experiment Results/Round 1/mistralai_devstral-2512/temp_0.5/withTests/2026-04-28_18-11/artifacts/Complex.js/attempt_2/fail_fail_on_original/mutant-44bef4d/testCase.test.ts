import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should correctly compute the arc cosecant for a specific complex number", () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    // The mutation changes -b/d to -b*d in the acsc method
    // This test uses a value where the division vs multiplication makes a clear difference
    expect(result.re).toBeCloseTo(0.34657359027997264, 10);
    expect(result.im).toBeCloseTo(-0.34657359027997264, 10);
  });
});