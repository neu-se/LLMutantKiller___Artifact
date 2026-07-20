import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cosecans', () => {
    const z = new Complex(0, 0);
    const result = z.acsc();
    expect(result.re).toBeCloseTo(Math.PI / 2, 5);
    expect(result.im).toBeCloseTo(Infinity, 5);
  });
});