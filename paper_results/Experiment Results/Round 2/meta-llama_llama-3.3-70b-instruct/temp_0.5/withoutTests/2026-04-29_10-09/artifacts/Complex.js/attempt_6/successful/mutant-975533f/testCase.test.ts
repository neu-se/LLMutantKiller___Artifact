import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acoth', () => {
    const complex = new Complex(1, 2);
    const result = complex.acoth();
    expect(result.im).toBeLessThan(0);
  });
});