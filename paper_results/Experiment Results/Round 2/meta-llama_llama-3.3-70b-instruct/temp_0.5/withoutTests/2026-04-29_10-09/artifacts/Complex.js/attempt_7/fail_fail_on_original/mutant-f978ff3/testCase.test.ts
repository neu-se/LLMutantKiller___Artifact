import { Complex } from "../complex";

describe('Complex', () => {
  it('should correctly calculate the complex csch', () => {
    const complex = new Complex(1, 1);
    const result = complex.csch();
    expect(result.im).not.toBeCloseTo(2 * Math.cosh(1) * Math.sin(1) * (Math.cos(2) - Math.cosh(2)), 10);
  });
});