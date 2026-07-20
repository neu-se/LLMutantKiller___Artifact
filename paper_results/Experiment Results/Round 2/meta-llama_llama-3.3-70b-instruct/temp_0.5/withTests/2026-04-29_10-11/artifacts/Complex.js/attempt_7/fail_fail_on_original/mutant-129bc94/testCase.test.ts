describe('Complex', () => {
  it('should have a property with a non-empty string key', () => {
    const Complex = global.Complex;
    const keys = Object.keys(Complex);
    expect(keys.some(key => key !== '' && Complex[key] === Complex)).toBe(true);
  });
});