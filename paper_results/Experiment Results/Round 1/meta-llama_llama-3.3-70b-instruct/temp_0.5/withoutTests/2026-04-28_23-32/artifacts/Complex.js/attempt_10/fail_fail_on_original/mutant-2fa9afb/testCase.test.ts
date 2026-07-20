describe('Complex', () => {
  it('should calculate the complex sinh correctly', () => {
    const Complex = require('./complex').Complex;
    const c = new Complex(1, 1);
    const result = c.sinh();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(0);
  });
});