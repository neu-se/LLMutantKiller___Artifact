import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should throw an error when parsing complex numbers with incorrect scientific notation on the mutated code', () => {
    const complexNumber = new Complex('1.23e+4+5.67i');
    expect(complexNumber.re).toBeCloseTo(12300);
    expect(complexNumber.im).toBeCloseTo(5.67);
    expect(() => new Complex('1.23e4+5.67e1i')).toThrowError();
  });
});