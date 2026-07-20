import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should handle non-zero complex numbers correctly", () => {
    const c = new Complex(1, 1);
    const result = c.acoth();
    expect(result.re).toBeCloseTo(0.402359478136215, 10);
    expect(result.im).toBeCloseTo(-0.553574358897045, 10);
  });
});