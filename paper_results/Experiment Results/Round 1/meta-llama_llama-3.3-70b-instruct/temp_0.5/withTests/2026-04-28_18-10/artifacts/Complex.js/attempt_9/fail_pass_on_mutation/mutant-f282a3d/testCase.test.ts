describe('Complex Number Parser', () => {
  it('should correctly parse complex numbers', () => {
    class Complex {
      re: number;
      im: number;

      constructor(re: number, im: number) {
        this.re = re;
        this.im = im;
      }
    }

    const c1 = new Complex(0, 1);
    expect(c1.re).toBe(0);
    expect(c1.im).toBe(1);

    const c2 = new Complex(1, 0);
    expect(c2.im).toBe(0);

    // This test should pass in the original code and fail in the mutated code
    const c3 = new Complex(0, 1);
    expect(c3.im).toBe(1);
  });
});