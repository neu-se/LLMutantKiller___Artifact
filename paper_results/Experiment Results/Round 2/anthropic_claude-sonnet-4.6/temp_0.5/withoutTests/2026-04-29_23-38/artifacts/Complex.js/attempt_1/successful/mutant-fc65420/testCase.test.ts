import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch function", () => {
  it("should return correct acsch for a real non-zero number", () => {
    // acsch(a) for real a != 0 should be log(a + sqrt(a^2 + 1))
    // The mutation changes (a !== 0) to (a === 0), which would return
    // Infinity instead of log(a + sqrt(a^2 + 1)) for non-zero real a
    const result = new Complex(1, 0).acsch();
    const expected = Math.log(1 + Math.sqrt(1 * 1 + 1));
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBe(0);
  });
});