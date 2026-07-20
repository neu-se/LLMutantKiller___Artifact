describe('Complex', () => {
  it('should correctly calculate acosh for complex numbers', () => {
    class Complex {
      re: number;
      im: number;

      constructor(re: number, im: number) {
        this.re = re;
        this.im = im;
      }

      acosh() {
        const r = Math.sqrt(this.re * this.re + this.im * this.im);
        const theta = Math.atan2(this.im, this.re);
        if (this.im <= 0) {
          return new Complex(Math.log(r + Math.sqrt(r * r - 1)), theta);
        } else {
          return new Complex(Math.log(r + Math.sqrt(r * r - 1)), -theta);
        }
      }
    }

    const c = new Complex(1, 0);
    const acosh = c.acosh();
    expect(acosh.re).toBeCloseTo(0, 5);
    expect(acosh.im).toBeCloseTo(0, 5);
  });
});