const Complex = require('../../../../complex.js');

describe('Complex', () => {
  it('should calculate cosm1 correctly for small x', () => {
    const x = 0.01;
    const result = Complex.cosm1(x);
    const expected = Math.cos(x) - 1;
    const tolerance = 1e-8;
    expect(Math.abs(result - expected)).toBeGreaterThan(tolerance);
  });
});