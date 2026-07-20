describe('Complex', () => {
  it('should parse a string with a plus sign and a number', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    const complex2 = new Complex('1+2a');
    expect(complex2.re).toBeNaN();
    expect(complex2.im).toBeNaN();
  });
});