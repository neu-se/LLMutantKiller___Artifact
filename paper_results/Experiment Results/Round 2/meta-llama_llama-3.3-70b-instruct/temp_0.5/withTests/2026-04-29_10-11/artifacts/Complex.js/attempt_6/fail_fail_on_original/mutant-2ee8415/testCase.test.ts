import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate asinh correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.asinh();
    expect(result.re).toBeCloseTo(0.48121182505960347);
    expect(result.im).toBeCloseTo(2.304533924561321);
  });
});