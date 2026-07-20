describe('Complex', () => {
  it('should throw an error when accessing a property that does not exist', () => {
    const Complex = require('./complex.js').Complex;
    const c1 = new Complex(1, 0);
    expect(() => c1[""]).toThrowError();
  });
});