import { Complex } from '../../../Complex.js';

describe('Complex', () => {
  it('should correctly calculate the complex arcus cosecans', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(-0.48121182505960347);
    expect(result.im).toBeCloseTo(-0.48045301391820144);
  });
});