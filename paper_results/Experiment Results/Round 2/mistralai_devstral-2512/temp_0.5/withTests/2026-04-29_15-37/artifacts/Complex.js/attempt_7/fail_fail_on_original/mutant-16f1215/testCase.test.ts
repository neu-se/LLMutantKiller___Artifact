import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should handle complex numbers with both non-zero parts correctly", () => {
    const c = new Complex(1, 2);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.2175632470902224);
    expect(result.im).toBeCloseTo(-0.2091189957043046);
  });
});