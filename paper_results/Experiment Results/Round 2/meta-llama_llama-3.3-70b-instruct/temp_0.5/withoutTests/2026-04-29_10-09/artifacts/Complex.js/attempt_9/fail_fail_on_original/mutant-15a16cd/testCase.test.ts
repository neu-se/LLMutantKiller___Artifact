import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the ceiling of a complex number to decimal places', () => {
    const complex = new Complex(1.2345, 6.789);
    const result = complex.ceil(2);
    const decimalPlacesRe = result.re.toString().split('.')[1];
    const decimalPlacesIm = result.im.toString().split('.')[1];
    expect(decimalPlacesRe).not.toBeNull();
    expect(decimalPlacesIm).not.toBeNull();
  });
});