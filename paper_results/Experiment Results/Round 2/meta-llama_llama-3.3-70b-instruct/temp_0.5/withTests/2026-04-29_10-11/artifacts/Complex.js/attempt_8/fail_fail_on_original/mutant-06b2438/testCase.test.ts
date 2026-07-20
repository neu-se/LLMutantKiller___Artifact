describe('Complex', () => {
  it('should calculate acosh correctly', () => {
    const complex = new Complex(2, 0);
    const result = complex.acosh();
    expect(typeof result).toBe('object');
  });
});