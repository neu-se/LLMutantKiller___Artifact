const Complex = require('../../../../complex.js');

describe('Complex', () => {
  it('should handle sinh correctly for non-zero input', () => {
    const complex = new Complex(1, 0);
    const result = complex.sinh();
    expect(result.re).toBeCloseTo(1.1752011660461475, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});