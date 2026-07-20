const Complex = require('./complex.js').Complex;

describe('Complex', () => {
  it('should correctly calculate the complex acoth for a = 0 and b = 1', () => {
    const complex = new Complex(0, 1);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(Math.PI / 2);
  });
});