import { Complex } from './complex';

describe('Complex', () => {
  it('should correctly calculate the complex atanh', () => {
    const complex = new Complex(2, 0);
    const atanh = complex.atanh();
    expect(atanh.re).toBeCloseTo(0.5493061443340548, 5);
    expect(atanh.im).toBeCloseTo(0, 5);
  });
});