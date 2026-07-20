describe('Complex number parsing', () => {
  it('should correctly parse complex numbers with different signs', () => {
    const Complex = require('../../../../complex.js').Complex;
    const complexNumber1 = new Complex('1+2i');
    const complexNumber2 = new Complex('1-2i');
    expect(complexNumber1.re).toBe(1);
    expect(complexNumber1.im).toBe(2);
    expect(complexNumber2.re).toBe(1);
    expect(complexNumber2.im).toBe(-2);
    const complexNumber3 = new Complex('3i');
    expect(complexNumber3.re).toBe(0);
    expect(complexNumber3.im).toBe(3);
  });
});