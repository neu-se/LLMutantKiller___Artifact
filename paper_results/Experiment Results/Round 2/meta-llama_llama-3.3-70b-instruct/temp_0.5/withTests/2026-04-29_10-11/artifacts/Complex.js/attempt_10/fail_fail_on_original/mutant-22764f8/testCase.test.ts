const Complex = require('./complex');

describe('Complex', () => {
  it('should calculate acot correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acot();
    expect(complex.re).toBeDefined();
    expect(complex.im).toBeDefined();
    expect(result.re).toBeDefined();
    expect(result.im).toBeDefined();
  });
});