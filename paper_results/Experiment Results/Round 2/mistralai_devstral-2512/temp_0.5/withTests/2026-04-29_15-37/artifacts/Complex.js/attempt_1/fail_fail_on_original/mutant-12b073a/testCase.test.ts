import { Complex } from "./complex";

describe('Complex sinh function', () => {
  it('should correctly compute sinh for a specific value', () => {
    const c = new Complex(1, 0);
    const result = c.sinh();
    const expectedRe = (Math.exp(1) - Math.exp(-1)) * 0.5;
    const expectedIm = 0;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});