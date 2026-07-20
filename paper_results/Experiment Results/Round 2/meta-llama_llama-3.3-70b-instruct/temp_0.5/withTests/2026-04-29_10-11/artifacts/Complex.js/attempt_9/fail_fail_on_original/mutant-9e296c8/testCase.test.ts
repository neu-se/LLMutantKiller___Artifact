import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should calculate csch correctly for the original code', () => {
    const complex = new Complex(1, 0);
    const result = complex.csch();
    expect(result.re).toBeCloseTo(-0.850918128239282, 5);
    expect(result.im).toBeCloseTo(0, 5);
    const complex2 = new Complex(2, 0);
    const result2 = complex2.csch();
    expect(result2.re).toBeCloseTo(-0.4021139577953396, 5);
    expect(result2.im).toBeCloseTo(0, 5);
  });
});