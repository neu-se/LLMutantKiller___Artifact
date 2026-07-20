import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should calculate the complex arcus secant', () => {
    const c = new Complex(1, 1);
    const result = c.asec();
    expect(result).toBeInstanceOf(Complex);
    expect(result.re).toBeCloseTo(0.46364760900080615);
    expect(result.im).toBeCloseTo(0.46364760900080615);
  });
});