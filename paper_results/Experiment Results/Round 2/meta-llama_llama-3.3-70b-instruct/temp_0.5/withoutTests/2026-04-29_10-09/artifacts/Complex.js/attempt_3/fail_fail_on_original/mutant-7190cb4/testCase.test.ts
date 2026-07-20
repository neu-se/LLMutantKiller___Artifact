import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cosecans for a specific case', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(result.im).not.toBeCloseTo(result.im * -1, 10);
  });
});