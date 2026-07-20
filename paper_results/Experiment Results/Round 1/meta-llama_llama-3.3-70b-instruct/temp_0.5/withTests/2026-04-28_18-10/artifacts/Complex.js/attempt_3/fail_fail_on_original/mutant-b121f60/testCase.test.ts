import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should parse complex numbers correctly', () => {
    const complexNumber = new Complex('1.23e+4+5.67i');
    expect(complexNumber.re).toBeCloseTo(12300);
    expect(complexNumber.im).toBeCloseTo(5.67);
  });

  it('should fail to parse complex numbers with missing exponent part in scientific notation', () => {
    expect(() => new Complex('1.23e+5.67i')).toThrowError(SyntaxError);
  });
});