import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex division', () => {
  it('should correctly divide complex numbers when |real| < |imaginary| in divisor', () => {
    const a = new Complex(3, 4);
    const b = new Complex(1, 2);
    const result = a.div(b);
    expect(result.re).toBeCloseTo(2.6, 10);
    expect(result.im).toBeCloseTo(-0.2, 10);
  });
});