import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should calculate asec correctly for asec(1)', () => {
    const complex = new Complex(1, 0);
    const result = complex.asec();
    expect(result.re).not.toBe(0);
    expect(result.im).toBeCloseTo(0, 10);
  });
});