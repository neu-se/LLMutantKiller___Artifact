import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh method", () => {
  it("should correctly compute acosh for a complex number with positive imaginary part", () => {
    const c = new Complex(2, 1);
    const result = c.acosh();
    expect(result.re).toBeCloseTo(1.4436354751788103);
    expect(result.im).toBeCloseTo(-0.48121182505960347);
  });
});