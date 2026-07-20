describe('Complex.js', () => {
  it('should correctly parse complex numbers with "i" and "I" notation', () => {
    const complexNumber1 = new Complex('3+4i');
    expect(complexNumber1.re).toBe(3);
    expect(complexNumber1.im).toBe(4);
    const complexNumber2 = new Complex('3+4I');
    expect(complexNumber2.re).toBe(3);
    expect(complexNumber2.im).toBe(4);
    // Add an assertion that will fail when the mutation is present
    expect(complexNumber2.im).not.toBeNaN();
  });
});