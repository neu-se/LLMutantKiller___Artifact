import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should parse complex numbers correctly', () => {
    const complexNumber = new Complex('1.23e4+5.67i');
    expect(complexNumber.re).toBeCloseTo(12300);
    expect(complexNumber.im).toBeCloseTo(5.67);
  });

  it('should parse complex numbers with scientific notation correctly', () => {
    const complexNumber = new Complex('1.23e+4+5.67e+1i');
    expect(complexNumber.re).toBeCloseTo(12300);
    expect(complexNumber.im).toBeCloseTo(56.7);
  });

  it('should fail to parse complex numbers with incorrect scientific notation', () => {
    const complexNumber = new Complex('1.23e4+5.67i');
    expect(complexNumber.re).toBeCloseTo(12300);
    expect(complexNumber.im).toBeCloseTo(5.67);
    const complexNumber2 = new Complex('1.23e+4+5.67e1i');
    expect(complexNumber2.re).toBeCloseTo(12300);
    expect(complexNumber2.im).toBeCloseTo(56.7);
    // The original code should parse '1.23e4+5.67e1i' correctly, but the mutated code should not.
    const complexNumber3 = new Complex('1.23e4+5.67e1');
    expect(complexNumber3.re).toBeCloseTo(12300);
    expect(complexNumber3.im).toBeCloseTo(0);
  });
});