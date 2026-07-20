describe('Complex', () => {
  it('should correctly handle the difference between || and && operators', () => {
    const originalCosh = Math.cosh;
    Math.cosh = null;
    const coshValue = Math.cosh(1);
    expect(coshValue).toBeNull();
    Math.cosh = originalCosh;
  });
});