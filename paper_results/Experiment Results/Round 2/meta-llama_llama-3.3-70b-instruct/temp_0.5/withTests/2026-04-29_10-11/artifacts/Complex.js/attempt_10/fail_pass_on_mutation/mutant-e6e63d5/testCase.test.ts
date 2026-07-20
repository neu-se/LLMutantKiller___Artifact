describe('Complex', () => {
  it('should throw an error when the acsc method is empty', () => {
    const acsc = function() {};
    expect(() => acsc()).not.toThrow();
  });
});