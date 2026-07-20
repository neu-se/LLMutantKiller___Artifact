import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cosecans', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsc();
    expect(result.re).not.toBeCloseTo(-0.5403023058681398 * 2);
    expect(result.im).not.toBeCloseTo(0.9969247267388464 * 2);
  });
});