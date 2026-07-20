import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex division mutation test', () => {
  it('should correctly handle division when |c| < |d| with specific values', () => {
    const a = new Complex(1, 1);
    const b = new Complex(0, 2);
    const result = a.div(b);
    expect(result.re).toBeCloseTo(0.5, 10);
    expect(result.im).toBeCloseTo(-0.5, 10);
  });
});