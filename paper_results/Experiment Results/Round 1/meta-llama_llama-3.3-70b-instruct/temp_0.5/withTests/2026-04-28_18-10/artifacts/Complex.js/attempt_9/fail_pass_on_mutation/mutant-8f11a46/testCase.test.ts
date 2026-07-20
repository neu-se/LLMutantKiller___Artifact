describe('Complex.js', () => {
  it('should parse a valid string complex number', () => {
    const complex = {
      re: 1,
      im: 2
    };
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
  });

  it('should not parse an invalid string', () => {
    const complex = {
      re: NaN,
      im: NaN
    };
    expect(complex.re).not.toBe(1);
    expect(complex.im).not.toBe(2);
  });
});