import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse", () => {
  it("should return the correct inverse for a complex number", () => {
    const c = new Complex(1, 1);
    const result = c.inverse();
    expect(result.re).toBeCloseTo(0.5);
    expect(result.im).toBeCloseTo(-0.5);
  });
});