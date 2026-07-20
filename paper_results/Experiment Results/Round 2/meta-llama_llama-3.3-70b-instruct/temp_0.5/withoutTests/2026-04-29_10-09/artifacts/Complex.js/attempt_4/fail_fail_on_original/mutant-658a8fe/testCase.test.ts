import Complex from './complex.js';

describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const c = new Complex(2, 1);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.48121182505960347, 5);
    expect(result.im).toBeCloseTo(-0.48121182505960347, 5);
  });
});