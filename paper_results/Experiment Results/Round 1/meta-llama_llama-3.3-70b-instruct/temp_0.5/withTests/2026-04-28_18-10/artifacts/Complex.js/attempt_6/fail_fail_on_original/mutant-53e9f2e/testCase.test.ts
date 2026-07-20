import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should handle atanh correctly', () => {
    const c = new Complex(1, 1);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(-0.46364760900080615, 10);
    expect(result.im).toBeCloseTo(-0.46364760900080615, 10);
  });
});