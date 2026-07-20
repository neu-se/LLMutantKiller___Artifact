const Complex = require('./complex');

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(0.9, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(1.151292546497023);
    expect(result.im).toBeCloseTo(0);
  });
});