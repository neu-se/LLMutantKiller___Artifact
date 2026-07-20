import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate asinh', () => {
    const c = new Complex(1, 2);
    const result = c.asinh();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});