import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle NaN values', () => {
    const complex = new Complex({ re: NaN, im: NaN });
    expect(complex.re).toBeNaN();
    expect(complex.im).toBeNaN();
  });
});