import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly calculate division', () => {
    const c1 = new Complex(4, 3);
    const c2 = new Complex(1, 2);
    const result = c1.div(c2);
    expect(result.re).toBeCloseTo(2.2, 1);
    expect(result.im).toBeCloseTo(-0.4, 1);
  });
});