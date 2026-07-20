import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex division mutation test', () => {
  it('should correctly handle division when |c| < |d| with specific values', () => {
    const a = new Complex(3, 4);
    const b = new Complex(1, 2);
    const result = a.div(b);
    expect(result.re).toBeCloseTo(2.6, 10);
    expect(result.im).toBeCloseTo(-0.2, 10);
  });
});