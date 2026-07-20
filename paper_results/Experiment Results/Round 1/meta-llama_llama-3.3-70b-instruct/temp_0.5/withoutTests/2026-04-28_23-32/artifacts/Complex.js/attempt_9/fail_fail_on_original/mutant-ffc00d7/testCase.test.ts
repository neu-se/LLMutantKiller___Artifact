describe('Complex', () => {
  it('should throw an error when parsing a complex number string with an "i" without a preceding number', () => {
    const complex = new Complex('i');
    expect(complex).toThrowError();
  });
});