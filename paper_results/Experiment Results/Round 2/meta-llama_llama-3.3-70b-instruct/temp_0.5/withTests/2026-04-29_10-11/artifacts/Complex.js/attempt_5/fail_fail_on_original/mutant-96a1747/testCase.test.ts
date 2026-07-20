import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should correctly calculate the complex atanh', () => {
    const complex = new Complex(1, 0);
    const atanh = complex.atanh();
    expect(atanh.im).toBeCloseTo(0, 5);
    const complex2 = new Complex(1.1, 0);
    const atanh2 = complex2.atanh();
    expect(atanh2.im).toBeCloseTo(0, 5);
  });
});