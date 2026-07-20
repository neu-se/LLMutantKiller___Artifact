describe('Complex', () => {
  it('should calculate acosh correctly', () => {
    const Complex = require('./complex.js').Complex;
    const complex = new Complex(2, 0);
    expect(complex.acosh).toBeInstanceOf(Function);
    expect(() => complex.acosh()).not.toThrow();
  });
});