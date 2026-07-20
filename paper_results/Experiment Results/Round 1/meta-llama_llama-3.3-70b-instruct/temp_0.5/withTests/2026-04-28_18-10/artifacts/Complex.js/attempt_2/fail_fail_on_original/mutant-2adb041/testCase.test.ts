import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate cosm1 correctly', () => {
    const complex = new Complex(Math.PI / 4);
    const result = complex.expm1();
    const expected = new Complex(Math.expm1(Math.PI / 4) * Math.cos(Math.PI / 4) + Math.cos(Math.PI / 4) - 1, Math.exp(Math.PI / 4) * Math.sin(Math.PI / 4));
    expect(result.equals(expected)).toBe(true);
  });
});