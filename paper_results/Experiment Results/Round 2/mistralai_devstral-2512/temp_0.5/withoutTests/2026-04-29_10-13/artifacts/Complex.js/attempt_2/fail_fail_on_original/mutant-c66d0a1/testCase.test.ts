import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should return correct value for non-zero complex number", () => {
    const c = new Complex(2, 3);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.1608, 4);
    expect(result.im).toBeCloseTo(-0.1425, 4);
  });
});