import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atan", () => {
  it("should correctly handle the case when imaginary part is not 1", () => {
    const c = new Complex(0, 0.5);
    const result = c.atan();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0.5493061443340548);
  });
});