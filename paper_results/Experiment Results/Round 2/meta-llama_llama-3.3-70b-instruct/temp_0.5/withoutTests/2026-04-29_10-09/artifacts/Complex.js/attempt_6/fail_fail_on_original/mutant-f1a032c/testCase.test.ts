import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should floor the imaginary part correctly', () => {
    const complex = new Complex(3.14159, 2.71828);
    const floored = complex.floor(2);
    expect(floored.im).not.toBeNaN();
    expect(floored.im).not.toBeUndefined();
  });
});