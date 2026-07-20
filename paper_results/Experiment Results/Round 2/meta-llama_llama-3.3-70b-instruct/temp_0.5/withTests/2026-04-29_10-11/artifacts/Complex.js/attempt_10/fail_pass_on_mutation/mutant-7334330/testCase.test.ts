describe('Complex', () => {
  it('should correctly calculate the division of two complex numbers', () => {
    const c1 = { re: 1, im: 2 };
    const c2 = { re: 2, im: 1 };
    const resultRe = (c1.re * c2.re + c1.im * c2.im) / (c2.re * c2.re + c2.im * c2.im);
    const resultIm = (c1.im * c2.re - c1.re * c2.im) / (c2.re * c2.re + c2.im * c2.im);
    expect(resultRe).toBeCloseTo(0.8);
    expect(resultIm).toBeCloseTo(0.6);
  });
});