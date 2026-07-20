import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should handle invalid input', () => {
    const c = new Complex('1+2i3');
    expect(c.re).toBeNaN();
    expect(c.im).toBeNaN();
  });
});