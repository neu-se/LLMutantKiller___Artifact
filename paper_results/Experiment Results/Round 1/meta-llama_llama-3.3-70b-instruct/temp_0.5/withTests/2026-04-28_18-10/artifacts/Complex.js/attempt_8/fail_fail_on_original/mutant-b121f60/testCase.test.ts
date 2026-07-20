import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should parse complex numbers with scientific notation correctly', () => {
    const complexNumber = new Complex('1.23e+4+5.67i');
    expect(complexNumber.re).toBeCloseTo(12300);
    expect(complexNumber.im).toBeCloseTo(5.67);
    const complexNumber2 = new Complex('1.23e4+5.67e1i');
    expect(() => new Complex('1.23e4+5.67e1i')).not.toThrowError();
  });
});