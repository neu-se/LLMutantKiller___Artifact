describe('Complex', () => {
  it('should throw an error when trying to floor the imaginary part of a complex number with an empty property', () => {
    const Complex = require('./complex.js');
    const complex = new Complex(1.5, 2.7);
    expect(() => complex.floor(1)).not.toThrow();
  });
});