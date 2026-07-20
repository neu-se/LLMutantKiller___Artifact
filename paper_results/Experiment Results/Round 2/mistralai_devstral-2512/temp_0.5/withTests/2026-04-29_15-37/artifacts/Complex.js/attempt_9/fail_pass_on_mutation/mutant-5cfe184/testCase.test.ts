import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should correctly handle real numbers greater than 1 by verifying the exact sign behavior", () => {
    const result = new Complex(2, 0).atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548);
    expect(result.im).toBeCloseTo(-Math.PI / 2);
    expect(result.im).not.toBe(Math.PI / 2);
  });
});