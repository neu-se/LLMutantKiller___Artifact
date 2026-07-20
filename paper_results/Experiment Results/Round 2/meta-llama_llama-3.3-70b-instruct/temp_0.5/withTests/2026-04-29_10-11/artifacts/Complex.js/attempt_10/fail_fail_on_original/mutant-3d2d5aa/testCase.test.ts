describe('Complex', () => {
  it('should correctly calculate the complex acoth for a = 1 and b = 1', () => {
    const complex = new (require('./complex.js').Complex)(1, 1);
    const result = complex.acoth();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});