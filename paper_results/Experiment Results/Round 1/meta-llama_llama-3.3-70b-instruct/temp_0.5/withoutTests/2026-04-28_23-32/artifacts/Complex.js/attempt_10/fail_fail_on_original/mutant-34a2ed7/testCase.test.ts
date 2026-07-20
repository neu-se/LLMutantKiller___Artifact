describe('Complex', () => {
  it('should correctly parse a complex number from a string and throw an error for invalid input', () => {
    const Complex = require('./complex.js').Complex;
    expect(() => new Complex('1a')).toThrow(SyntaxError);
  });
});