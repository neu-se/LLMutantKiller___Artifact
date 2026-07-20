import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosm1 correctly', () => {
    const x = 0.1;
    const result = Math.cos(x) - 1;
    const complexResult = cosm1(x);
    expect(complexResult).toBeCloseTo(result, 10);
  });
});