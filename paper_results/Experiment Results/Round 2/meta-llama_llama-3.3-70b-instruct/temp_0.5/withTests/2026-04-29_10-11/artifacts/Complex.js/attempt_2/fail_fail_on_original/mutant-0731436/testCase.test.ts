import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct result for asec', () => {
    const c = new Complex(1, 1);
    const result = c.asec();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});