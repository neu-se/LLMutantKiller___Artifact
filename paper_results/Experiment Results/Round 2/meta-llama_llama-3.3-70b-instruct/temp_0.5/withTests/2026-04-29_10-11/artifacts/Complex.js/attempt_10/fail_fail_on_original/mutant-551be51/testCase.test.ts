import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should return a Complex object with ceil function', () => {
    const complex = new Complex(1.2, 3.4);
    expect(complex.ceil).toBeDefined();
    expect(typeof complex.ceil).toBe('function');
    const result = complex.ceil(1);
    expect(result).toBeInstanceOf(Complex);
    expect(result.re).toBeCloseTo(2);
    expect(result.im).toBeCloseTo(4);
  });
});