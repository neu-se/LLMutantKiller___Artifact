const Complex = require('./complex').Complex;

describe('Complex', () => {
  it('should throw an error when parsing an empty string', () => {
    expect(() => new Complex('')).toThrowError();
  });
});