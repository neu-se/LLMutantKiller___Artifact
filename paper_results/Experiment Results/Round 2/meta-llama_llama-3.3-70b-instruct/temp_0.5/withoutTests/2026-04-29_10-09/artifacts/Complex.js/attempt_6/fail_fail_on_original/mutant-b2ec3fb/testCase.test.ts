const Complex = require('./complex.js');

describe('Complex', () => {
  it('should not throw an error when flooring a complex number', () => {
    const complex = new Complex(10.5, 20.7);
    expect(() => complex.floor(0)).not.toThrowError();
  });
});