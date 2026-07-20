import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh for a real number greater than 1", () => {
    // atanh(2) should return a complex number with a well-defined imaginary part
    // Original: x['im'] = Math.atan2(x['im'], temp) / 2
    // Mutated: x['im'] = Math.atan2(x[""], temp) / 2 => NaN
    const result = new Complex(2, 0).atanh();
    
    // atanh(2) = 0.5 * log(3/-1) = 0.5493... - i*π/2
    // The imaginary part should be -Math.PI / 2
    expect(result.re).toBeCloseTo(Math.log(3) / 2, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
    expect(isNaN(result.im)).toBe(false);
  });
});