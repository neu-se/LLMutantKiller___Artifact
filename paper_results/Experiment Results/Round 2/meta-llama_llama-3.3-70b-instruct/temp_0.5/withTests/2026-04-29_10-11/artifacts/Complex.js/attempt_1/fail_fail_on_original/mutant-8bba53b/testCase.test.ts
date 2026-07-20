import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cos(x) - 1 correctly for small x', () => {
    const smallX = 0.0001;
    const result = Complex.cosm1(smallX);
    const expected = Math.cos(smallX) - 1;
    expect(Math.abs(result - expected)).toBeLessThan(1e-10);
  });
});