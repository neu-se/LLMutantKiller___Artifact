import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should have a defined asec method', () => {
    const complex = new Complex(1, 1);
    expect(complex).toHaveProperty('asec');
    expect(typeof complex['asec']).toBe('function');
  });
});