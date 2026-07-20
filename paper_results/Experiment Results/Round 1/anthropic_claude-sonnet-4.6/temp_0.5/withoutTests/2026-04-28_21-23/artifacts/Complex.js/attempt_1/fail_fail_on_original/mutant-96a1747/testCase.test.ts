import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh mutation detection", () => {
  it("should correctly compute atanh for a real number greater than 1", () => {
    // For a real number a > 1, atanh(a) should have im = 0 (noIM = true)
    // The original code sets x['im'] = -x['im'] when noIM is true
    // The mutated code sets x['im'] = -x[""] which is -undefined = NaN
    const result = new Complex(2, 0).atanh();
    
    // atanh(2) = 0.5 * ln(3) + i*pi/2 before the noIM adjustment
    // After adjustment (noIM = true), im should be set to 0
    expect(result.im).toBe(0);
    expect(isNaN(result.im)).toBe(false);
    // The real part should be approximately atanh(2) = 0.5493...
    expect(result.re).toBeCloseTo(0.5493061443340548, 10);
  });
});