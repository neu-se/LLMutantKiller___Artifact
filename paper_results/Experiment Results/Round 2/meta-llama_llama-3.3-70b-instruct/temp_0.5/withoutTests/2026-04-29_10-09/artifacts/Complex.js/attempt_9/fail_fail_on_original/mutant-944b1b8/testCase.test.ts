import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate asech correctly for a specific case', () => {
    const complex = new Complex(0, 0);
    const result = complex.asech();
    expect(result.re).toBeNaN();
    expect(result.im).toBeNaN();
  });
});