import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should handle asinh correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.asinh();
    expect(result.re).toBe(0.48121182505960347);
    expect(result.im).toBe(1.0574610364236114);
  });
});