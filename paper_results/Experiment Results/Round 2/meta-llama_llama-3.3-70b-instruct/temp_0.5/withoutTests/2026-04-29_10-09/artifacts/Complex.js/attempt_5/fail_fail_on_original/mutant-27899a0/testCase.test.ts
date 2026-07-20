import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should handle atanh correctly for a = -1', () => {
    const complex = new Complex(-1, 0);
    expect(() => complex.atanh()).toThrow();
  });
});