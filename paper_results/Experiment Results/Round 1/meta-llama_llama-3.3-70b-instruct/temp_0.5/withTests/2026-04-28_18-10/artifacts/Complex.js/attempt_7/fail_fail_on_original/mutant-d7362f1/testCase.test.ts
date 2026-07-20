describe('Complex', () => {
  it('should correctly multiply two complex numbers', () => {
    const Complex = require('./complex.js').Complex;
    const c1 = new Complex(1, 0);
    const c2 = new Complex(2, 0);
    const result = c1.mul(c2);
    expect(result.re).toBe(2);
    expect(result.im).toBe(0);
    const c3 = new Complex(1, 0);
    const c4 = new Complex(2, 0);
    const result2 = c3.mul(c4);
    expect(result2.re).toBe(2);
    expect(result2.im).toBe(0);
    // Test the mutation by checking if the property access is incorrect
    expect(() => c1.mul(c4)).not.toThrowError();
    expect(c1["im"]).toBe(0);
    expect(c2["re"]).toBe(2);
    // This should fail on the mutated code
    const c5 = new Complex(1, 0);
    const c6 = new Complex(2, 0);
    const result3 = c5.mul(c6);
    expect(result3.re).toBe(2);
    expect(result3.im).toBe(0);
  });
});