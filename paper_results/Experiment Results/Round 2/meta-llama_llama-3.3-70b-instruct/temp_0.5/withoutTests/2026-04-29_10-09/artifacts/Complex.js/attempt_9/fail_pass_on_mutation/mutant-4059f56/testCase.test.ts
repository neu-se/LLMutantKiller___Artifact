describe('Complex', () => {
  it('should return the correct real part when cloning', () => {
    const complex = { re: 1, im: 2 };
    const clonedComplex = { re: complex["re"], im: complex["im"] };
    expect(clonedComplex.re).toBe(1);
  });
});