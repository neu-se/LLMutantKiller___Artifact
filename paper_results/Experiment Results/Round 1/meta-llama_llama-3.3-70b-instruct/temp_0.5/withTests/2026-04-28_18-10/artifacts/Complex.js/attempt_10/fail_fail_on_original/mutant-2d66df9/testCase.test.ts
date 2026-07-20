describe('Complex number parsing', () => {
  it('should correctly parse complex numbers with different signs', () => {
    const complex = require('./complex.js');
    const Complex = complex.Complex;
    const complexNumber = new Complex('1+2i-3i');
    expect(complexNumber.re).toBe(1);
    expect(complexNumber.im).toBe(-1);
  });
});