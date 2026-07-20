import { Complex } from './complex';

describe('Complex', () => {
  it('should return the correct result for acoth', () => {
    const c = new Complex(1, 1);
    const result = c.acoth();
    const expectedRe = c.re / (c.re * c.re + c.im * c.im);
    expect(result.re).toBeCloseTo(expectedRe);
  });
});