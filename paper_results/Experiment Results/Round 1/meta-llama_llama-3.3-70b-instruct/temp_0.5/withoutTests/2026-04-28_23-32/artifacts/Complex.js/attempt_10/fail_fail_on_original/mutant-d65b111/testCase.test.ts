const Complex = require('./complex.js').Complex;

describe('Complex', () => {
  it('should throw an error when calculating asech with a complex number that has an imaginary part of zero', () => {
    const complex = new Complex(0.5, 0);
    expect(() => complex.asech()).toThrowError();
  });
});