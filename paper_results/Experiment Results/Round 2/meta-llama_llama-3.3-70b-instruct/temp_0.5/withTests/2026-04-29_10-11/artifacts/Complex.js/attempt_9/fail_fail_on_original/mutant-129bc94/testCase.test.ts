describe('Complex', () => {
  it('should have a property with a non-empty string key', () => {
    const Complex = (global as any).Complex;
    if (Complex) {
      const keys = Object.keys(Complex);
      expect(keys).not.toContain('');
    } else {
      throw new Error('Complex is not defined');
    }
  });
});