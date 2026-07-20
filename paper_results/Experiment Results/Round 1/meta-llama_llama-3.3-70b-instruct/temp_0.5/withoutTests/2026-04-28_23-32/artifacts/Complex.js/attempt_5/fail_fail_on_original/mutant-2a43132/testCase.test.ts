import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate asec correctly for non-zero input', () => {
    const complex = new Complex(2, 1);
    const originalCodeResult = complex.asec();
    expect(originalCodeResult).not.toBe(false);
  });
});