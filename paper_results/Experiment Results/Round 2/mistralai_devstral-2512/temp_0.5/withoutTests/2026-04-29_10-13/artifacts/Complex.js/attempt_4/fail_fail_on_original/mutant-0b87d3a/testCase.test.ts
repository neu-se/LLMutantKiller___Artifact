import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should return correct value for complex number (1,1)", () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.4523, 4);
    expect(result.im).toBeCloseTo(-0.3805, 4);
  });
});