import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log mutation detection', () => {
  it('should compute pow correctly for large complex numbers', () => {
    // Use values that trigger the large-number path in logHypot
    const base = new Complex(4000, 3000);
    const result = base.pow(new Complex(2, 0));
    // (4000+3000i)^2 = 4000^2 - 3000^2 + 2*4000*3000*i = 7000000 + 24000000i
    expect(result.re).toBeCloseTo(7000000, 0);
    expect(result.im).toBeCloseTo(24000000, 0);
  });
});