import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should handle non-zero imaginary part correctly", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.443568254487566);
    expect(result.im).toBeCloseTo(-0.380506377112364);
  });
});