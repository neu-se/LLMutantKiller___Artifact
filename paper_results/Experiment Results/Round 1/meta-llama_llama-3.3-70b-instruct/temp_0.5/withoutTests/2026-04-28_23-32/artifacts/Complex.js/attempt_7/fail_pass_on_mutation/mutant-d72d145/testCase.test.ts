import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cosecans', () => {
    const complex = new Complex(2, 2);
    const result = complex.acsc();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});