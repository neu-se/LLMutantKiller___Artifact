import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should calculate asec correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });
});