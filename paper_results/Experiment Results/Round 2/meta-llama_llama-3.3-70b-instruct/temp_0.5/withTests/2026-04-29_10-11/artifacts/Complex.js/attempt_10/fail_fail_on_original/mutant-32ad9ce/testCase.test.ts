describe('Complex.js', () => {
  it('should handle NaN values correctly', () => {
    const complex1 = { re: NaN, im: 1 };
    expect(complex1.re).toBeNaN();
    expect(complex1.im).toBe(1);
    const complex2 = { re: 1, im: NaN };
    expect(complex2.re).toBe(1);
    expect(complex2.im).toBeNaN();
    const complex3 = { re: NaN, im: NaN };
    expect(complex3.re).toBeNaN();
    expect(complex3.im).toBeNaN();
    expect(() => {
      if (isNaN(complex3.re) && isNaN(complex3.im)) {
        // Do nothing
      } else if (isNaN(complex3.re) || isNaN(complex3.im)) {
        throw new Error("Invalid input");
      }
    }).toThrow();
  });
});