import { Complex } from '../../complex';

describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(-0.48121182505960347, 10);
    expect(result.im).toBeCloseTo(0.48121182505960347, 10);
  });
});