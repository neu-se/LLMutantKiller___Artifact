import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should correctly handle the case where both real and imaginary parts are non-zero", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.48121182505960347, 10);
    expect(result.im).toBeCloseTo(-0.48121182505960347, 10);
  });
});