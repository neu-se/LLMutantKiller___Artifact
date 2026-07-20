import { Complex } from "../../../../complex.js";

describe('Complex', () => {
  it('should return the correct result for asec', () => {
    const complex = new Complex(0, 1);
    const result = complex.asec();
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});