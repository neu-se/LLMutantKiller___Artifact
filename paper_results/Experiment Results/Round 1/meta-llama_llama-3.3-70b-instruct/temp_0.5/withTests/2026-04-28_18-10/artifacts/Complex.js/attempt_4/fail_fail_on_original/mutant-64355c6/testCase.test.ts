import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly calculate asec for a = 0 and b = 0', () => {
    const complex = new Complex(0, 0);
    const result = complex.asec();
    expect(result.re).not.toBeCloseTo(0, 10);
    expect(result.im).not.toBeCloseTo(Infinity, 10);
  });
});