import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cosecans for a = 0 and b = 0', () => {
    const complex = new Complex(0, 0);
    expect(complex.acsc().re).toBeCloseTo(Math.PI / 2, 10);
    expect(complex.acsc().im).toBeCloseTo(Infinity, 10);
  });
});