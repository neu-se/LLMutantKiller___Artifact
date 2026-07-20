import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when calculating logHypot for large numbers with incorrect condition', () => {
    const complex = new Complex(3001, 3000);
    const originalCodeResult = Math.log(Math.sqrt(3001**2 + 3000**2));
    const mutatedCodeResult = Math.log(Math.sqrt(3001**2 + 3000**2));
    expect(complex.log().re).not.toBeCloseTo(mutatedCodeResult, 10);
  });
});