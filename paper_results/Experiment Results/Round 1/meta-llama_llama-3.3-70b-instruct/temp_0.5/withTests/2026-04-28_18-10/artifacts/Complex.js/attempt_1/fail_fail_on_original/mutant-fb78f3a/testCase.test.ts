import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly handle asec for a = 0 and b = 0', () => {
    const c = new Complex(0, 0);
    expect(c.asec().toString()).toBe('0,Infinity');
  });
});