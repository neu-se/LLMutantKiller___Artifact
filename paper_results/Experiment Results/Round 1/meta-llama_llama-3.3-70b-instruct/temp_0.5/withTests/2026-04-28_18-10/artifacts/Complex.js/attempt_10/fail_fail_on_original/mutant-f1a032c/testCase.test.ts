describe('Complex', () => {
  it('should correctly floor the imaginary part of a complex number', () => {
    const Complex = require('../../../../complex.js');
    const complex = new Complex(1.5, 2.7);
    const result = complex.floor(1);
    expect(result.im).toBeCloseTo(2.7);
  });
});