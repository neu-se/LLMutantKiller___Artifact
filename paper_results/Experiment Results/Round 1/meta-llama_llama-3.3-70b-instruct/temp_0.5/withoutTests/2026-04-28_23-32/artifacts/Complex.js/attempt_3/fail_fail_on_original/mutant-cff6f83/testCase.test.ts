import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const complex = new Complex(2, 1);
    const result = complex.acsch();
    const originalResult = new Complex(0.48121182505960347, -0.48121182505960347);
    const mutatedResult = new Complex(0.5493061443340549, 0.5493061443340549);
    expect(result.re).toBeCloseTo(originalResult.re, 10);
    expect(result.im).toBeCloseTo(originalResult.im, 10);
    // The test should fail when run against the mutated code
    // because the mutated code returns a different result
    expect(result.re).not.toBeCloseTo(mutatedResult.re, 10);
    expect(result.im).not.toBeCloseTo(mutatedResult.im, 10);
  });
});