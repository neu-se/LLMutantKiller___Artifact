import { Complex } from "../complex";

describe('Complex', () => {
  it('should correctly calculate the complex acsch for the original code but fail for the mutated code', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    expect(result.im).toBeCloseTo(0, 15);
  });
});