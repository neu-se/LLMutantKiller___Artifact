import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should return a value when sech is called', () => {
    const complex = new Complex(1, 1);
    const result = complex.sech();
    expect(result).not.toBeNull();
  });
});