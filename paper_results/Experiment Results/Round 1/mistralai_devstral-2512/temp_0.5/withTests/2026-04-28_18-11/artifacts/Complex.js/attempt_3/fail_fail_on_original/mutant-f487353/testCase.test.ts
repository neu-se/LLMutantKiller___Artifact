import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.csc() method', () => {
  it('should correctly compute the cosecant of a purely imaginary number', () => {
    const c = new Complex(0, 1);
    const result = c.csc();
    // For c = 0 + 1i, csc(c) should be 0 - 1.1883951057781212i
    // The mutation would change the sign of the imaginary component
    expect(result.im).toBeCloseTo(-1.1883951057781212, 10);
  });
});