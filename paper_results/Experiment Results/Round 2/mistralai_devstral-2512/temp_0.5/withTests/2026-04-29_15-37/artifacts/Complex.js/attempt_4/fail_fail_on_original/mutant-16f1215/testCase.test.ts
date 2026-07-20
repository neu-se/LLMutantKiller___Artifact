import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should handle non-zero complex numbers correctly", () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    const expected = new Complex(0.6154840296423248, -0.3077420148211624);
    expect(result.re).toBeCloseTo(expected.re);
    expect(result.im).toBeCloseTo(expected.im);
  });
});