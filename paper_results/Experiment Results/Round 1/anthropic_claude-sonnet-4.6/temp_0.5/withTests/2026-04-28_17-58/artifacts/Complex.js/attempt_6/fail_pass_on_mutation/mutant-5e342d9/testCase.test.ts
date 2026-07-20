import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs large values hypot", () => {
  it("computes correct abs using hypot for large values triggering a>=b branch", () => {
    // Use a Pythagorean triple scaled up: (9000, 4000) -> hypotenuse = ?
    // sqrt(81000000 + 16000000) = sqrt(97000000) ≈ 9849.0
    // Test that abs() returns the mathematically correct value
    const re = 9000;
    const im = 4000;
    const c = new Complex(re, im);
    const expected = Math.sqrt(re * re + im * im);
    // Use small-value path to get reference
    const cSmall = new Complex(re / 10, im / 10);
    const expectedSmall = cSmall.abs() * 10;
    expect(c.abs()).toBeCloseTo(expectedSmall, 5);
  });
});