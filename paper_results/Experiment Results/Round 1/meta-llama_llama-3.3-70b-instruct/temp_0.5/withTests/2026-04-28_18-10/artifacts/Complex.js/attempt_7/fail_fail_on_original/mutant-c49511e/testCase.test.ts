// assuming the file is named complex.js and it exports the Complex class
const complex = require('./complex');

describe('Complex.js', () => {
  it('should calculate the cosecans of a complex number correctly', () => {
    const Complex = complex.Complex;
    const complexNumber = new Complex(1, 2);
    const result = complexNumber.csc();
    expect(result).not.toBeNull();
    expect(result.re).not.toBeUndefined();
    expect(result.im).not.toBeUndefined();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
    expect(complexNumber.csc().re).not.toBe(complexNumber.csc()[""]);
  });
});