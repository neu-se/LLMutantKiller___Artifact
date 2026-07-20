import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cosecans for a specific case', () => {
    const complex = new Complex(0, 1);
    const originalResult = complex.acsc();
    const complex2 = new Complex(0, -1);
    const mutatedResult = complex2.acsc();
    expect(originalResult.im).not.toBeCloseTo(mutatedResult.im, 10);
  });
});