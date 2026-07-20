import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly calculate cos(x) - 1 using Taylor series for small x', () => {
    const smallX = 0.01;
    const complex = new Complex(smallX);
    const result = complex.cosm1(smallX);
    expect(result).toBeCloseTo(Math.cos(smallX) - 1, 10);
  });
});