import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly floor a complex number with a specified number of decimal places', () => {
    const complex = new Complex(10.5, 20.7);
    const floored = complex.floor(0);
    expect(floored.re).toBe(10);
    expect(floored.im).toBe(20);
  });
});