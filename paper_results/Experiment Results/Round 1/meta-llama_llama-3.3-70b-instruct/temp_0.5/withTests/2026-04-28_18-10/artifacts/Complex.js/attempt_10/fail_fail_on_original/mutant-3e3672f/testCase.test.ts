describe('Complex.js', () => {
  it('should correctly parse complex numbers with "i" notation', () => {
    const complexNumber = new Complex('3+4i');
    expect(complexNumber.re).toBe(3);
    expect(complexNumber.im).toBe(4);
  });
});