import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh of a real number like 0.5", () => {
    const c = new Complex(0.5, 0);
    const result = c.atanh();
    // atanh(0.5) = 0.5493061443340548...
    const expected = Math.atanh(0.5);
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});