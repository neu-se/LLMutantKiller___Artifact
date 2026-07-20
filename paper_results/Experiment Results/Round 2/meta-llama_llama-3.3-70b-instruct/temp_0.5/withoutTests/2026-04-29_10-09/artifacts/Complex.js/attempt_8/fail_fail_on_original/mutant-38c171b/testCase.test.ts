import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acsch for the original code but fail for the mutated code', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsch();
    expect(result.im).toBeCloseTo(-Infinity, 15);
  });
});