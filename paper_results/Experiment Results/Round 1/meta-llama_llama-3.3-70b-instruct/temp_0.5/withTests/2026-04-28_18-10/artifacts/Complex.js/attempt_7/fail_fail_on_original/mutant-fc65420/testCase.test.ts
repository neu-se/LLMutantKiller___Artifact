import { Complex } from './complex';

describe('Complex', () => {
  it('should return a finite value when the real part is not zero for the acsch function', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});