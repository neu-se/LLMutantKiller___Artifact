import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should detect the mutation in the acsc function', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(0.48121182505960347, 5);
    expect(result.im).toBeCloseTo(-0.48121182505960347, 5);
  });
});