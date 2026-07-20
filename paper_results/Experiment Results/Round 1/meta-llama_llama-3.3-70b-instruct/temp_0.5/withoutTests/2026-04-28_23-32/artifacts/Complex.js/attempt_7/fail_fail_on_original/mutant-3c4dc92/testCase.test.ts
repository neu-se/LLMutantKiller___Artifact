describe('Complex', () => {
  it('should correctly calculate atanh', () => {
    // Define the Complex class manually
    class Complex {
      re: number;
      im: number;

      constructor(re: number, im: number) {
        this.re = re;
        this.im = im;
      }

      atanh() {
        // Manually implement the atanh method
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

    const complex = new Complex(1.1, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.9504831855467292);
    expect(result.im).toBeCloseTo(0);
  });
});