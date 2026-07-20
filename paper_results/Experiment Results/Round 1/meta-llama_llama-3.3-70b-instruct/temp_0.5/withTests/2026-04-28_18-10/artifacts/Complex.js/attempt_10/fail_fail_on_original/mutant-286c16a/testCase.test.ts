describe('Complex', () => {
  it('should have an asinh method that returns a value', () => {
    const Complex = require('../complex').Complex;
    const complex = new Complex(1, 2);
    const result = complex.asinh();
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
  });
});