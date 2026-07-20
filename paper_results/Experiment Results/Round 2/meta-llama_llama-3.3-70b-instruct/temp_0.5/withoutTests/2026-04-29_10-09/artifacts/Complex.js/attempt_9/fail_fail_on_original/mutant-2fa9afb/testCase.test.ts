const complex = require('./complex.js');

describe('Complex', () => {
  it('should handle sinh correctly for non-zero input', () => {
    const c = new complex.Complex(1, 0);
    const result = c.sinh();
    expect(result.re).toBeCloseTo(1.1752011660461475, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});