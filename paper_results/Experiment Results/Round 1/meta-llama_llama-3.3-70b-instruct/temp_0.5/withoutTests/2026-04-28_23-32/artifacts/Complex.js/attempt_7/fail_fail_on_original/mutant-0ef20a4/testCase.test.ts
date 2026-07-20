import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return correct result when inverse is called', () => {
    const complex = new Complex(1, 0);
    const result = complex.inverse();
    expect(result.re).toBe(1);
    expect(result.im).toBe(0);
  });
});