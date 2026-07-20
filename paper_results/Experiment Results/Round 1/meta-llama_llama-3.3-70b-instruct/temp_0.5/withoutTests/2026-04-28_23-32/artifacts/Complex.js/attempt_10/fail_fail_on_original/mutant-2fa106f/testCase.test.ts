import { Complex } from "../../../../../complex.js";

describe('Complex', () => {
  it('should return a specific result for atan when b is 1 and not return NaN', () => {
    const complex = new Complex(0, 1);
    const result = complex.atan();
    expect(result.im).not.toBeNull();
    expect(result.im).not.toBeNaN();
  });
});