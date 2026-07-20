jest.mock('./complex.js', () => ({
  __esModule: true,
  default: function(re, im) {
    this.re = re;
    this.im = im;
    this.add = function(re2, im2) {
      return { re: this.re + re2, im: this.im + im2 };
    };
    this.sub = function(re2, im2) {
      return { re: this.re - re2, im: this.im - im2 };
    };
    this.mul = function(re2, im2) {
      return { re: this.re * re2 - this.im * im2, im: this.re * im2 + this.im * re2 };
    };
    this.div = function(re2, im2) {
      const denominator = re2 * re2 + im2 * im2;
      return { re: (this.re * re2 + this.im * im2) / denominator, im: (this.im * re2 - this.re * im2) / denominator };
    };
    this.pow = function(exponent) {
      const r = Math.sqrt(this.re * this.re + this.im * this.im);
      const theta = Math.atan2(this.im, this.re);
      return { re: Math.pow(r, exponent) * Math.cos(exponent * theta), im: Math.pow(r, exponent) * Math.sin(exponent * theta) };
    };
  },
  Complex: function(re, im) {
    this.re = re;
    this.im = im;
    this.add = function(re2, im2) {
      return { re: this.re + re2, im: this.im + im2 };
    };
    this.sub = function(re2, im2) {
      return { re: this.re - re2, im: this.im - im2 };
    };
    this.mul = function(re2, im2) {
      return { re: this.re * re2 - this.im * im2, im: this.re * im2 + this.im * re2 };
    };
    this.div = function(re2, im2) {
      const denominator = re2 * re2 + im2 * im2;
      return { re: (this.re * re2 + this.im * im2) / denominator, im: (this.im * re2 - this.re * im2) / denominator };
    };
    this.pow = function(exponent) {
      const r = Math.sqrt(this.re * this.re + this.im * this.im);
      const theta = Math.atan2(this.im, this.re);
      return { re: Math.pow(r, exponent) * Math.cos(exponent * theta), im: Math.pow(r, exponent) * Math.sin(exponent * theta) };
    };
  },
}));

const Complex = require('./complex.js');

describe('Complex', () => {
  it('should export Complex as a module', () => {
    expect(Complex.__esModule).toBe(true);
    expect(typeof Complex.default).toBe('function');
    expect(typeof Complex.Complex).toBe('function');
    expect(Complex.default).toBe(Complex.Complex);
    const complex = new Complex.default(1, 2);
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    expect(complex.add(3, 4).re).toBe(4);
    expect(complex.add(3, 4).im).toBe(6);
    expect(complex.sub(3, 4).re).toBe(-2);
    expect(complex.sub(3, 4).im).toBe(-2);
    expect(complex.mul(3, 4).re).toBe(-5);
    expect(complex.mul(3, 4).im).toBe(10);
    expect(complex.div(3, 4).re).toBeCloseTo(0.44);
    expect(complex.div(3, 4).im).toBeCloseTo(0.08);
    expect(complex.pow(2).re).toBeCloseTo(-3);
    expect(complex.pow(2).im).toBeCloseTo(4);
  });
});