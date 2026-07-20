import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should correctly compute acsch for complex number with non-zero real part", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.48121182505960347, 10);
    expect(result.im).toBeCloseTo(-0.40235947810852506, 10);
  });
});