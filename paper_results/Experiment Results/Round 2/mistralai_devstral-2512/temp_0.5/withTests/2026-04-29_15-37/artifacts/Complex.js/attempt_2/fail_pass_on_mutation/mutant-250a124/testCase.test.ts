import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex division mutation test', () => {
  it('should fail when division uses incorrect formula for |c| < |d| case', () => {
    const a = new Complex(1, 1);
    const b = new Complex(0, 1);
    const result = a.div(b);
    expect(result.re).toBeCloseTo(1, 10);
    expect(result.im).toBeCloseTo(-1, 10);
  });
});