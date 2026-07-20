import { Complex } from './complex';

describe('Complex', () => {
  it('should return the correct result for acoth', () => {
    const c = new Complex(2, 1);
    const result = c.acoth();
    const expected = new Complex(c.re / (c.re * c.re + c.im * c.im), -c.im / (c.re * c.re + c.im * c.im)).atanh();
    expect(result.re).toBeCloseTo(expected.re);
    expect(result.im).toBeCloseTo(expected.im);
  });
});