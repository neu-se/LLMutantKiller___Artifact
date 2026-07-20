import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus secant', () => {
    const complex = new Complex(1, 1);
    expect(complex['asec']).toBeInstanceOf(Function);
  });
});