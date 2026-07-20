import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate cosm1 correctly', () => {
    const complex = new Complex(Math.PI / 4);
    const result = complex.exp().sub(1);
    const expected = new Complex(Math.exp(Math.PI / 4) - 1, 0);
    expect(result.equals(expected)).toBe(true);
  });
});