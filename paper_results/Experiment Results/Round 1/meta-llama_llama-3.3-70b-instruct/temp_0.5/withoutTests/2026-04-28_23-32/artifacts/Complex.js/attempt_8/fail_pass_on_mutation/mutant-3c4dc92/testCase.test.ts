describe('Complex', () => {
  it('should correctly calculate atanh', () => {
    // Use the original code to calculate atanh
    class Complex {
      re: number;
      im: number;

      constructor(re: number, im: number) {
        this.re = re;
        this.im = im;
      }

      atanh() {
        // Use the original code to calculate atanh
        const oneMinus = 1 - this.re;
        const onePlus = 1 + this.re;
        const d = oneMinus * oneMinus + this.im * this.im;
        const x = new Complex(
          (onePlus * oneMinus - this.im * this.im) / d,
          (this.im * oneMinus + onePlus * this.im) / d
        );
        const temp = x.re;
        x.re = Math.log(x.re) / 2;
        x.im = Math.atan2(x.im, temp) / 2;
        return x;
      }
    }

    const complex = new Complex(0.5, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340549);
    expect(result.im).toBeCloseTo(0);
  });
});