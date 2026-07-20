import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should calculate acsch correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(-0.48121182505960347, 5);
    expect(result.im).toBeCloseTo(-0.8964766911961586, 5);
  });
});