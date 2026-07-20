import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should parse complex numbers correctly', () => {
    const complexNumber = new Complex('1.23e+4+5.67i');
    expect(complexNumber.re).toBeCloseTo(12300);
    expect(complexNumber.im).toBeCloseTo(5.67);
  });

  it('should parse complex numbers with scientific notation correctly', () => {
    const complexNumber = new Complex('1.23e4+5.67e-1i');
    expect(complexNumber.re).toBeCloseTo(12300);
    expect(complexNumber.im).toBeCloseTo(0.567);
  });
});