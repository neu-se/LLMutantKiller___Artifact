const Complex = require('../complex.js');

describe('Complex', () => {
  it('should have a sech function that returns a non-undefined value', () => {
    const complex = new Complex(1, 1);
    const result = complex.sech();
    expect(result).not.toBeUndefined();
  });
});