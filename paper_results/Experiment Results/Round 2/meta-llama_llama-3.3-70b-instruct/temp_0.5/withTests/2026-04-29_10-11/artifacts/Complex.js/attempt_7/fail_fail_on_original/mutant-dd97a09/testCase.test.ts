const Complex = require('./complex');

describe('Complex', () => {
  it('should have a sech function that returns a non-undefined value', () => {
    const complex = new Complex(1, 1);
    const result = complex.sech();
    expect(result).not.toBeUndefined();
  });
});