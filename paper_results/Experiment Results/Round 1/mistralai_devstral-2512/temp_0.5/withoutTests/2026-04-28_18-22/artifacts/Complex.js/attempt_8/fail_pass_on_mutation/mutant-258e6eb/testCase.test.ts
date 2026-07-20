import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly handle real numbers greater than 1", () => {
    const result = new Complex(2, 0).atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
    expect(result.im).toBeLessThan(0);
    expect(result.im).not.toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).not.toBeGreaterThan(0);
  });
});