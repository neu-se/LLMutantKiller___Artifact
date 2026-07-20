describe('Complex.js', () => {
  it('should create a new complex number with default values when no arguments are provided and the real part is correctly assigned', () => {
    const Complex = require('./complex.js').Complex;
    const complex = new Complex();
    expect(complex).toHaveProperty('re');
    expect(complex.re).toBe(0);
    const keys = Object.keys(complex);
    expect(keys.includes('re')).toBe(true);
    expect(complex.hasOwnProperty('re')).toBe(true);
  });
});