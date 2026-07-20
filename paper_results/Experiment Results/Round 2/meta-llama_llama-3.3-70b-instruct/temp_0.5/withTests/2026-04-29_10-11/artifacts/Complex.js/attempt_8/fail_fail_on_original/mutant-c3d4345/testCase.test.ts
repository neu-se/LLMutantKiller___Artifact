import { Complex } from '../complex';

describe('Complex', () => {
  it('should return the correct result for asec when a is not 0', () => {
    const complex = new Complex(1, 0);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});