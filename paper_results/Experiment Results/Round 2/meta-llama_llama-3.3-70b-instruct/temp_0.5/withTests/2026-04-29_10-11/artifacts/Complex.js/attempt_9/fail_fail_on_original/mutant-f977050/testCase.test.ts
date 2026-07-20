describe('Complex', () => {
  it('should calculate the complex acosh correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acosh();
    expect(result.re).toBeGreaterThan(0);
    expect(result.im).toBeGreaterThan(0);
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
    expect(result.im).not.toBeNaN();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeUndefined();
    expect(result.re).not.toBeUndefined();
  });
});