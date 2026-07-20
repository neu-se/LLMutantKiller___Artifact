import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate asec correctly for asec(0)', () => {
    const complex = new Complex(0, 0);
    const result = complex.asec();
    expect(result.re).not.toBe(0);
    expect(result.im).toBeCloseTo(Infinity, 10);
  });
});