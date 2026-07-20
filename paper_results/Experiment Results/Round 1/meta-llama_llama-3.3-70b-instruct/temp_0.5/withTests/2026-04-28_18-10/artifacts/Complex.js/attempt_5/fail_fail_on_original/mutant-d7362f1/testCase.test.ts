describe('Complex', () => {
  it('should correctly multiply two complex numbers with zero imaginary part', () => {
    const Complex = require('./complex.js').Complex;
    const c1 = new Complex(1, 0);
    const c2 = new Complex(2, 0);
    const result = c1.mul(c2);
    expect(result.re).toBe(2);
    expect(result.im).toBe(0);
    // Test the mutation by checking if the property access is correct
    expect(c1["im"]).toBe(0);
    expect(c2["re"]).toBe(2);
  });
});