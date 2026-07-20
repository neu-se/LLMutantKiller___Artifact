import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should handle the case where a^2 - b^2 equals zero correctly", () => {
    const c = new Complex(Math.sqrt(2), Math.sqrt(2));
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.443568254487566);
    expect(result.im).toBeCloseTo(-0.380506377112364);
  });
});