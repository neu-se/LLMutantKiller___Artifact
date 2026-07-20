import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should parse complex numbers correctly', () => {
    const complexNumber = new Complex('1.23e+4+5.67i');
    expect(complexNumber.re).toBeCloseTo(12300);
    expect(complexNumber.im).toBeCloseTo(5.67);
    const complexNumber2 = new Complex('1.23e4+5.67i');
    expect(complexNumber2.re).toBeCloseTo(12300);
    expect(complexNumber2.im).toBeCloseTo(5.67);
  });
});