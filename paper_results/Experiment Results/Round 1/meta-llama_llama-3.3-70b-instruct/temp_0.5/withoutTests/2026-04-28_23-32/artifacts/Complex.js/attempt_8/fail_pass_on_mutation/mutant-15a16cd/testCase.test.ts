import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly floor the complex number with a specific decimal place', () => {
    const complex = new Complex(12.3456, 7.8901);
    const floored = complex.floor(5);
    expect(floored.re).toBeCloseTo(12.3456);
    expect(floored.im).toBeCloseTo(7.8901);
  });
});