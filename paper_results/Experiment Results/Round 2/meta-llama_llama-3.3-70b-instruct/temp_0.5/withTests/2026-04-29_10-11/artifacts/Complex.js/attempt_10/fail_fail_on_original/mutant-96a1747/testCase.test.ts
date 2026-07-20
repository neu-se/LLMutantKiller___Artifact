import { Complex } from '../complex';

describe('Complex', () => {
  it('should correctly calculate the complex atanh', () => {
    const complex = new Complex(1.1, 0);
    const atanh = complex.atanh();
    expect(atanh.re).toBeCloseTo(0.9501821192326173, 5);
    expect(atanh.im).toBeCloseTo(0, 5);
    const complex2 = new Complex(1, 0);
    const atanh2 = complex2.atanh();
    expect(atanh2.im).toBeCloseTo(0, 5);
    expect(atanh2.re).not.toBeNaN();
  });
});