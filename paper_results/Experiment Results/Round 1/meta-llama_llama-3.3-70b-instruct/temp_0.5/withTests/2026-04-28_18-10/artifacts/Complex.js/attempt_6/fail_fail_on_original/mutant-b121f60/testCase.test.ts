import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should parse complex numbers with scientific notation correctly', () => {
    const complexNumber = new Complex('1.23e+4+5.67i');
    expect(complexNumber.re).toBeCloseTo(12300);
    expect(complexNumber.im).toBeCloseTo(5.67);
    // The original code should throw an error when parsing '1.23e4+5.67e1i', but the mutated code should not.
    const complexNumber2 = new Complex('1.23e4+5.67e1i');
    expect(complexNumber2.re).not.toBeCloseTo(12300);
    expect(complexNumber2.im).not.toBeCloseTo(5.67);
  });
});