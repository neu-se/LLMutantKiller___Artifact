const Complex = require('./complex');

describe('Complex', () => {
  it('should correctly handle atanh for a = 0.5', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});