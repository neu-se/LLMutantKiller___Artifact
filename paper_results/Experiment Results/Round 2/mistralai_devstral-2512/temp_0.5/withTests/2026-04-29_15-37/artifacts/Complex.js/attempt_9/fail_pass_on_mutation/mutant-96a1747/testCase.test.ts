import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute the inverse hyperbolic tangent for a complex number with specific values", () => {
    const c = new Complex(0.5, 1);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0.23887786125685914);
    expect(result.im).toBeCloseTo(0.8475756606708291);
  });
});