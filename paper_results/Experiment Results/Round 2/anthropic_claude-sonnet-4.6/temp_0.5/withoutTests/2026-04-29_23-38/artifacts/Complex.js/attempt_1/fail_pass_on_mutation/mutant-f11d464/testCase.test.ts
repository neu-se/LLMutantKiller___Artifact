import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow with purely imaginary base", () => {
  it("should correctly compute (i)^2 = -1 when base is purely imaginary", () => {
    // When base is purely imaginary (a=0, b=1) and exponent is real integer
    // (0 + i)^2 should equal -1 + 0i
    // This uses the case a === 0 branch with (z['re'] % 4 + 4) % 4 === 2
    const result = new Complex(0, 1).pow(2);
    expect(result.re).toBeCloseTo(-1, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});