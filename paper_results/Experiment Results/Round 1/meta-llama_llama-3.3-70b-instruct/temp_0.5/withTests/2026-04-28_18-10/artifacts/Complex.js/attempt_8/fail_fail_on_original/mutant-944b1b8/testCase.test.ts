import { Complex } from '../../../complex';

describe('Complex', () => {
  it('should handle asec function correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(Math.PI / 2);
  });
});