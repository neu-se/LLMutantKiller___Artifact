import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus cosecans correctly', () => {
    const complex = new Complex(1, 2);
    const resultOriginal = complex.acsc();
    const complexMutated = new Complex(1, -2);
    const resultMutated = complexMutated.acsc();
    expect(resultOriginal.toString()).not.toBe(resultMutated.toString());
  });
});