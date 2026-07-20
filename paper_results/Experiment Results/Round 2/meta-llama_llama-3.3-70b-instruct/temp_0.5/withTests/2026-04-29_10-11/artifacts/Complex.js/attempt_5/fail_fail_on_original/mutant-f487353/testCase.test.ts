import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the cosecans of a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    expect(result.im).toBeLessThan(0); 
  });
});