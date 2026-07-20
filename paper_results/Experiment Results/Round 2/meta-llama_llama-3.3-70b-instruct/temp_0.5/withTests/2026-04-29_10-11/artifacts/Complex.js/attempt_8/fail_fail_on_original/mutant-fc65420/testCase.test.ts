import { Complex } from './complex';

describe('Complex', () => {
  it('should return the correct result for acsch when a is zero', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});