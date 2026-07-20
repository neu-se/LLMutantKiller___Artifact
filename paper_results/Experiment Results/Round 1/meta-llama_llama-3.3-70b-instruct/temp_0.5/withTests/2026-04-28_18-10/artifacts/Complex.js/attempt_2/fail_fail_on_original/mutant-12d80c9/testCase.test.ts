import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly calculate the complex asech', () => {
    const c = new Complex(1, 0);
    const result = c.asech();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});