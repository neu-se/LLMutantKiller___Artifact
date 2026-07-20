import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acoth', () => {
    const complex = new Complex(1, 2);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(0.17328679513998624, 5);
    expect(result.im).toBeCloseTo(-0.721355, 5);
  });
});