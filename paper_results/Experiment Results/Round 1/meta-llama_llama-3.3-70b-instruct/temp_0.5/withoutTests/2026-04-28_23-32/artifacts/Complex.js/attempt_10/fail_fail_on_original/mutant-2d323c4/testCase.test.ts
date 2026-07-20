describe('Complex', () => {
  it('should throw an error for division by zero in acsch', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acsch()).toThrow();
  });
});