import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should calculate acot correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(Math.atan(1), 10);
    expect(result.im).toBeCloseTo(0, 10);
    const complex2 = new Complex(0, 1);
    const result2 = complex2.acot();
    expect(result2.re).toBeCloseTo(-Math.PI/2, 10);
    expect(result2.im).toBeCloseTo(0, 10);
    const complex3 = new Complex(1, 1);
    const result3 = complex3.acot();
    expect(result3.re).toBeCloseTo(0.46364760900080615, 10);
    expect(result3.im).toBeCloseTo(-0.7853981633974483, 10);
  });
});