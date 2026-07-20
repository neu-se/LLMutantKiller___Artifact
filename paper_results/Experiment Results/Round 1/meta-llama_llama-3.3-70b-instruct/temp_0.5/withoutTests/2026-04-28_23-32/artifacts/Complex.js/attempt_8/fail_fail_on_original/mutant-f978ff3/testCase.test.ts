import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex csch', () => {
    const complex = new Complex(1, 1);
    const result = complex['csch']();
    const d = Math.cos(2) + Math.cosh(2);
    expect(result['im']).toBeCloseTo(-2 * Math.cosh(1) * Math.sin(1) / d, 10);
  });
});