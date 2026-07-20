import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should return a real result for atanh of a real number less than 1", () => {
    // For a real number a where 0 < a < 1, atanh(a) should be purely real (im = 0)
    // The noIM flag is supposed to be true only when a > 1 && b === 0
    // With the mutation noIM = true always, the imaginary part gets negated even when it shouldn't
    const c = new Complex(0.5, 0);
    const result = c.atanh();
    
    // atanh(0.5) = 0.5493061443340548... (real number, im should be 0)
    expect(result.im).toBeCloseTo(0, 10);
    expect(result.re).toBeCloseTo(Math.atanh(0.5), 10);
  });
});