import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should correctly compute the inverse hyperbolic tangent of a complex number", () => {
    const z = new Complex(0.5, 0.5);
    const result = z.atanh();
    expect(result.re).toBeCloseTo(0.4023594781085251);
    expect(result.im).toBeCloseTo(0.5549390312279605);
  });
});