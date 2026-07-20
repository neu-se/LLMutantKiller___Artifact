import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate cosm1 correctly', () => {
    const complex = new Complex(0.1);
    const result = complex.expm1();
    const expected = new Complex(Math.expm1(0.1) * Math.cos(0.1) + Math.cos(0.1) - 1, Math.exp(0.1) * Math.sin(0.1));
    expect(result.equals(expected)).toBe(true);
  });
});