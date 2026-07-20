import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should correctly compute acsc for a purely imaginary number (0 + 1i)", () => {
    // For z = i (a=0, b=1):
    // Original: a===0 && b===0 is false, so proceeds to general calculation
    // Mutated: a===0 && true is true, so returns Complex(PI/2, Infinity) incorrectly
    const z = new Complex(0, 1);
    const result = z.acsc();

    // acsc(i) = -i * log(i/i + sqrt(1 - 1/i^2))
    // = -i * log(1 + sqrt(1 - (-1)))
    // = -i * log(1 + sqrt(2))
    // The imaginary part should NOT be Infinity
    expect(isFinite(result.im)).toBe(true);
    expect(isFinite(result.re)).toBe(true);
  });
});