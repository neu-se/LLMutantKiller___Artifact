import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should return correct value for complex number (1,0)", () => {
    const c = new Complex(1, 0);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(1.5708, 4);
    expect(result.im).toBeCloseTo(0, 4);
  });
});