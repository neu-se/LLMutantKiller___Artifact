const Complex = require('./complex');

describe('Complex', () => {
  it('should correctly calculate acsch for real numbers', () => {
    const c = new Complex(1, 0);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(Math.log(1 + Math.sqrt(2)), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});