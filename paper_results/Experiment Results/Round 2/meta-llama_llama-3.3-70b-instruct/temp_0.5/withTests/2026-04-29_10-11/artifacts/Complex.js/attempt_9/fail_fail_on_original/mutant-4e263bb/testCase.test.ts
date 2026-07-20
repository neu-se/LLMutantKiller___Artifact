describe('Complex.js', () => {
  it('should throw an error when trying to access an undefined property', () => {
    const Complex = require('./complex.js');
    const complex = new Complex(1, 2);
    expect(complex.re).toBe(1);
    expect(() => complex[""]).toThrow();
  });
});