const Complex = require('./complex.js').Complex;

describe('Complex', () => {
  it('should correctly handle a string with a missing imaginary part', () => {
    expect(() => new Complex('1+')).toThrowError(SyntaxError);
  });
});