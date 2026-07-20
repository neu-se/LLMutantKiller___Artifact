import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return a finite number when places is not provided', () => {
    const complex = new Complex(1.2345, 6.789);
    const rounded = complex.round();
    expect(Number.isFinite(rounded.re)).toBe(true);
    expect(Number.isFinite(rounded.im)).toBe(true);
  });
});