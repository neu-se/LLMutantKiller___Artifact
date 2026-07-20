import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when multiplying two complex numbers and the placeholder code is empty', () => {
    const c1 = new Complex(2, 0);
    const c2 = new Complex(3, 0);
    const result = c1.mul(c2);
    expect(() => {
      if (c1.im === 0 && c2.im === 0) {
        // do nothing
      }
    }).toThrowError();
  });
});