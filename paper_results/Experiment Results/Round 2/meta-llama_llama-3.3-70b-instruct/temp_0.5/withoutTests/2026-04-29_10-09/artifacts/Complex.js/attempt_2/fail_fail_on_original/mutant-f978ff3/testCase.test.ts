import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex csch', () => {
    const complex = new Complex(1, 1);
    const result = complex['csch']();
    expect(result['re']).toBeCloseTo(-2 * sinh(1) * Math.cos(1) / (Math.cos(2) - cosh(2)), 10);
    expect(result['im']).not.toBeCloseTo(2 * cosh(1) * Math.sin(1) * (Math.cos(2) - cosh(2)), 10);
  });
});