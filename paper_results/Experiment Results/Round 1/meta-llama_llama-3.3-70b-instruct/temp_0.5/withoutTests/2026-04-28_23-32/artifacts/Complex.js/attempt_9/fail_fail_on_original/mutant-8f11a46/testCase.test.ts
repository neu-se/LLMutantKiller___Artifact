const Complex = require('../../../../complex.js').Complex;

describe('Complex', () => {
  it('should parse complex number from string correctly', () => {
    const complexNumber = new Complex('1+2i');
    expect(complexNumber.re).toBe(1);
    expect(complexNumber.im).toBe(2);
    const complexNumber2 = new Complex('1');
    expect(complexNumber2.re).toBe(1);
    expect(complexNumber2.im).toBe(0);
    const complexNumber3 = new Complex('a');
    expect(complexNumber3.re).toBeNaN();
    expect(complexNumber3.im).toBeNaN();
    expect(() => new Complex('a')).not.toThrowError();
  });
});