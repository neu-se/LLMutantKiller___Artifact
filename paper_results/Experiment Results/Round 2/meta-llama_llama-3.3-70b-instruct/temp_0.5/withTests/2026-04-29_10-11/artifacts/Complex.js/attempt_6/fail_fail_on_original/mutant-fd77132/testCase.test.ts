import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should return a complex number when calling asec on a complex number', () => {
    const complex = new Complex(2, 0);
    expect(complex.asec()).not.toBeNull();
  });
});