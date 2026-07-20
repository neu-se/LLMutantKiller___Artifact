const Complex = require('../../../../complex.js');

describe('Complex', () => {
  it('should correctly handle atanh for a = -0.9', () => {
    const complex = new Complex(-0.9, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(-1.4722194895836174, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});