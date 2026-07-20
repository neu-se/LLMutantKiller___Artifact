import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cosecans for a specific case', () => {
    const complex1 = new Complex(0, 1);
    const result1 = complex1.acsc();
    const complex2 = new Complex(0, -1);
    const result2 = complex2.acsc();
    expect(result1.im).not.toBeCloseTo(result2.im, 10);
  });
});