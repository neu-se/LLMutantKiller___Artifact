import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should have an asec method', () => {
    const complex = new Complex(1, 0);
    expect(complex).toHaveProperty('asec');
  });
});