import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly calculate cos(x) - 1 using Taylor series for small x', () => {
    const smallX = 0.01;
    const result = new Complex(smallX).expm1();
    expect(result.re).toBeCloseTo(Math.exp(smallX) - 1, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});