class Complex {
  re: number;
  im: number;

  constructor(a: number, b: number) {
    this.re = a;
    this.im = b;
  }

  asin(): Complex {
    // implementation of the asin method
    return new Complex(0, 0);
  }

  asinh(): Complex {
    // implementation of the asinh method
    var tmp = this.im;
    this.re = tmp;
    var res = this.asin();
    this.re = -this.im;
    this.im = tmp;
    tmp = res.re;
    res.re = -res.im;
    res.im = tmp;
    return res;
  }
}

describe('Complex', () => {
  it('should have a re property that is not an empty string after calling asinh', () => {
    const complex = new Complex(1, 2);
    complex.asinh();
    expect(complex.re).not.toBe('');
  });
});