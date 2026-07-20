import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log mutation', () => {
  it('should compute log correctly when called via asin with purely imaginary input', () => {
    const z = new Complex(0, 2);
    const result = z.asin();
    // asin(2i) = i * log(sqrt(5) + 2) 
    const expected = Math.log(2 + Math.sqrt(5));
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(expected, 10);
  });
});