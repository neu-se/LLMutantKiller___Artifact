import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a truthy value when calling sech on the original code and falsy on the mutated code', () => {
    const complex = new Complex(1, 2);
    const result = complex.sech();
    expect(!!result).toBe(true);
  });
});