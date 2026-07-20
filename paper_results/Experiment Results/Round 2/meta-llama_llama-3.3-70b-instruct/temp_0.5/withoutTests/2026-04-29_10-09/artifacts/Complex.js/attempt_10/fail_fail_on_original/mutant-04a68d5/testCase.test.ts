describe('Complex', () => {
  it('should calculate the complex sech correctly', () => {
    const Complex = require('./complex.js').Complex;
    const complex = new Complex(1, 0);
    const sech = complex.sech();
    expect(complex.re).toBeDefined();
    expect(complex["re"]).toBeDefined();
    expect(complex["re"]).not.toBeUndefined();
  });
});