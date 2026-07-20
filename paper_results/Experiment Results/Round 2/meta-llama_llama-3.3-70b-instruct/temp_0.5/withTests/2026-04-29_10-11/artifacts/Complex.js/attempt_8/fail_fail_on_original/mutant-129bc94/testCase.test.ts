describe('Complex', () => {
  it('should have a property with a non-empty string key', () => {
    const Complex = (global as any).Complex;
    if (Complex) {
      const keys = Object.keys(Complex);
      expect(keys.some(key => key !== '' && Complex[key] === Complex)).toBe(true);
    } else {
      throw new Error('Complex is not defined');
    }
  });
});