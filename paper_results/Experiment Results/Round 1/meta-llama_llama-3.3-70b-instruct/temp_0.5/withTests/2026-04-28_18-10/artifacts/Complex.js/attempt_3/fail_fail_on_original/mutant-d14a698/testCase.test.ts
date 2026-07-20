import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant', () => {
    const complex = new Complex(1, 1);
    const resultOriginal = new Complex((1 / 0) * -1, 0).acos();
    const resultMutated = new Complex((1 / 0) * 1, 0).acos();
    expect(resultOriginal.re).not.toBeCloseTo(resultMutated.re);
  });
});