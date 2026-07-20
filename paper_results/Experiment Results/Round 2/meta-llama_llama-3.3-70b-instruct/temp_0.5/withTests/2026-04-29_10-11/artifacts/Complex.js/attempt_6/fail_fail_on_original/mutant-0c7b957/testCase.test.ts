import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate atanh', () => {
    const complex = new Complex(2, 2);
    const result = complex.atanh();
    expect(result.re).toBeNaN();
  });
});