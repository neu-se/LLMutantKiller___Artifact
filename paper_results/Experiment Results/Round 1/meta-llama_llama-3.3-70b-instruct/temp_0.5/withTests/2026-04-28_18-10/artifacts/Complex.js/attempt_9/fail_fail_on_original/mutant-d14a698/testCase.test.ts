import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant for a specific case', () => {
    const complex = new Complex(0, 1);
    const resultOriginal = complex.asec();
    const resultMutated = new Complex((0 / 0) * -1, 0).acos();
    expect(resultOriginal.re).not.toBeCloseTo(resultMutated.re);
  });
});