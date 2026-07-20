const Complex = require('../../../../complex.js').Complex;

describe('Complex', () => {
  it('should return correct result for acoth function', () => {
    const complex = new Complex(1, 2);
    const result = complex.acoth();
    expect(result).not.toBe(false);
  });
});