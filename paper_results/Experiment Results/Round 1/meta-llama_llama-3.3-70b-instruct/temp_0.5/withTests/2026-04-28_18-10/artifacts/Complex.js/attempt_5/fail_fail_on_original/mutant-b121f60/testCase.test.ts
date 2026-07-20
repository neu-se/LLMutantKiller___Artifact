import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should parse complex numbers with scientific notation correctly', () => {
    const complexNumber = new Complex('1.23e4+5.67i');
    expect(complexNumber.re).toBeCloseTo(12300);
    expect(complexNumber.im).toBeCloseTo(5.67);
    const complexNumber2 = new Complex('1.23e+4+5.67e+1i');
    expect(complexNumber2.re).toBeCloseTo(12300);
    expect(complexNumber2.im).toBeCloseTo(56.7);
    // The original code should throw an error when parsing '1.23e4+5.67e1', but the mutated code should not.
    expect(() => new Complex('1.23e4+5.67e1')).toThrowError(SyntaxError);
  });
});