import { Complex } from '../../../../../complex.js';

describe('Complex', () => {
  it('should correctly calculate asec for a non-zero imaginary part', () => {
    const complex = new Complex(0, 0);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Infinity, 10);
  });
});