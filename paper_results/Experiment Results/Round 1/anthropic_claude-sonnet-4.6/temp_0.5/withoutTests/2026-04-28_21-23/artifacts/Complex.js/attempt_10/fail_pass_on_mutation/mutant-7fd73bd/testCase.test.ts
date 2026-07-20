import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log mutation detection', () => {
  it('should compute log of zero correctly', () => {
    const z = new Complex(0, 0);
    const result = z.log();
    expect(result.re).toBe(-Infinity);
    expect(result.im).toBe(0);
  });
});