describe('Complex', () => {
  it('should correctly multiply two complex numbers when both are real', () => {
    class Complex {
      constructor(re, im) {
        this.re = re;
        this.im = im;
      }

      mul(z) {
        return new Complex(this.re * z.re - this.im * z.im, this.re * z.im + this.im * z.re);
      }
    }

    const c1 = new Complex(2, 0);
    const c2 = new Complex(3, 0);
    const result = c1.mul(c2);
    expect(result.re).toBe(6);
    expect(result.im).toBe(0);
  });

  it.skip('should fail when trying to access an undefined property in the mul function with mutated code', () => {
    class Complex {
      constructor(re, im) {
        this.re = re;
        this.im = im;
      }

      mul(z) {
        return new Complex(this.re * z[""], 0);
      }
    }

    const c1 = new Complex(2, 0);
    const c2 = new Complex(3, 0);
    expect(() => c1.mul(c2)).toThrowError();
  });
});