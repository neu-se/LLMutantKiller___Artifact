import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should return a real result (no imaginary part) for atanh of a real number between 0 and 1", () => {
    // For a real number a where 0 < a < 1, atanh(a) should be purely real (im === 0)
    // The noIM flag is supposed to be true only when a > 1 && b === 0
    // When noIM is wrongly set to true for all cases, it negates x['im'] even when it shouldn't
    // For a = 0.5, b = 0: atanh(0.5) should be approximately 0.5493... with im = 0
    const z = new Complex(0.5, 0);
    const result = z.atanh();
    
    // The imaginary part should be 0 for atanh of a real number between -1 and 1
    expect(result.im).toBeCloseTo(0, 10);
    // The real part should be approximately 0.5493
    expect(result.re).toBeCloseTo(Math.atanh(0.5), 10);
  });
});