import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cosecans for a specific case', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsc();
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});