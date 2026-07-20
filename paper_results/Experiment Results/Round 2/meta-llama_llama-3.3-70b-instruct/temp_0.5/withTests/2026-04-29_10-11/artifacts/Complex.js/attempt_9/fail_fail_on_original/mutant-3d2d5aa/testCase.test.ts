const Complex = require('./complex.js').Complex;

describe('Complex', () => {
  it('should throw an error when calculating the complex acoth for a = 0 and b = 0', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acoth()).toThrowError();
  });
});