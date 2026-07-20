describe('Complex', () => {
  it('should throw an error when parsing a string with an invalid character', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    expect(() => new Complex('1+2a')).toThrowError(SyntaxError);
  });
});