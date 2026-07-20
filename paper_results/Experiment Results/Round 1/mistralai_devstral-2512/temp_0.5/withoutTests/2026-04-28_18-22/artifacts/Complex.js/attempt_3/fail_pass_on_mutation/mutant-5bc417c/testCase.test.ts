import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth", () => {
  it("should return correct value for real number greater than 1", () => {
    const c = new Complex(2, 0);
    const result = c.acoth();
    expect(result.re).toBeCloseTo(0.5493061443340548);
    expect(result.im).toBeCloseTo(0);
  });
});