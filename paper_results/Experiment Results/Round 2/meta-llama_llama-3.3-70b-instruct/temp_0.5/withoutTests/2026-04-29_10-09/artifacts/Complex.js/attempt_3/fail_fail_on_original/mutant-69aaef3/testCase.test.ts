import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate hypot', () => {
    const complex = new Complex(3, 4);
    expect(complex.abs()).toBeCloseTo(5);
    const complex2 = new Complex(3, 0);
    expect(complex2.abs()).toBeCloseTo(3);
    const complex3 = new Complex(0, 4);
    expect(complex3.abs()).toBeCloseTo(4);
    const complex4 = new Complex(0, 0);
    expect(complex4.abs()).toBeCloseTo(0);
  });
});