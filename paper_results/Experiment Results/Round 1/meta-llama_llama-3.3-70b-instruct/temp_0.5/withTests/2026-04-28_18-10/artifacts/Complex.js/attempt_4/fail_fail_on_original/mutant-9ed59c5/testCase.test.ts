describe('Complex.js', () => {
  it('should define the Complex class when using AMD', () => {
    const complex = new (Function('return this.Complex')())(1, 2);
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
  });
});