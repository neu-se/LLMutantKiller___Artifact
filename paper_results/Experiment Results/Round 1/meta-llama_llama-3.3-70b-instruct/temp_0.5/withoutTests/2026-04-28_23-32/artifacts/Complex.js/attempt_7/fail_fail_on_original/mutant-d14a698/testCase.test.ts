import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant', () => {
    const complex = new Complex(1, -1);
    const result = complex.asec();
    expect(result.im).toBeLessThan(0);
  });
});