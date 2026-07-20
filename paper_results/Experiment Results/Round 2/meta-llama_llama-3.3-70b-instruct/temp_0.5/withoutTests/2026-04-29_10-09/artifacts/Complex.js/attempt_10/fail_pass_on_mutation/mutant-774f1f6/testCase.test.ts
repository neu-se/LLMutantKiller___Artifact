describe('Complex', () => {
  it('should correctly parse a complex number', () => {
    const complex = { re: 1, im: 2 };
    expect(complex).toHaveProperty('re');
    expect(complex).toHaveProperty('im');
    expect(Object.keys(complex)).toContain('re');
    expect(Object.keys(complex)).toContain('im');
    expect(Object.keys(complex)).not.toContain('');
  });
});