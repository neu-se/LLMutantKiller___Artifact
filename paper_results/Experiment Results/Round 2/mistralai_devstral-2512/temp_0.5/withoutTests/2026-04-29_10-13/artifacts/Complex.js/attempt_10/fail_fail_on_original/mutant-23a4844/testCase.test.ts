import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should produce correct real component for values greater than 1", () => {
    const result = new Complex(1.1, 0).atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548, 10);
  });
});