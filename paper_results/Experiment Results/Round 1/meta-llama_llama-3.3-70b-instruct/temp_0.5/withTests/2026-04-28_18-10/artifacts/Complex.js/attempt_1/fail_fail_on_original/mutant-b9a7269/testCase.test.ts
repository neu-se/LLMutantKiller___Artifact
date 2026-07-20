import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly floor a complex number', () => {
    const complex = new Complex(10.5, 20.7);
    const floored = complex.floor(1);
    expect(floored.re).toBe(10.0);
    expect(floored.im).toBe(20.0);
  });
});