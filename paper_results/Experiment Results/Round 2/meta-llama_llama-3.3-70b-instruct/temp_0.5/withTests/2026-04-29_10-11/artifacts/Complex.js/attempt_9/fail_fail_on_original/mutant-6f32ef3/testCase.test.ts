describe('Complex', () => {
  it('should correctly handle the toString method when the imaginary part is negative zero', () => {
    const Complex = require('./complex.js').Complex;
    const complex = new Complex(1, -0);
    expect(complex.toString()).toBe('1');
    const complex2 = new Complex(1, 0);
    expect(complex2.toString()).toBe('1');
    const complex3 = new Complex(1, -0.00001);
    expect(complex3.toString()).toBe('1 - 1e-5i');
    const complex4 = new Complex(1, 0);
    expect(complex4.toString()).toBe('1');
  });
});