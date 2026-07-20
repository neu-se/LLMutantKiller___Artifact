import { Complex } from "./complex";

describe('Complex', () => {
  it('should return Infinity for atan when a is 0 and b is 1 in the mutated code', () => {
    const complex = new Complex(0, 1);
    const result = complex.atan();
    expect(result.im).toBeCloseTo(Infinity, 10);
  });
});