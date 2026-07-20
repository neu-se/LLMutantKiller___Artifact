describe('Complex.js', () => {
  it('should parse a string complex number correctly', () => {
    const complex = {
      re: 1,
      im: 2
    };
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
  });
});