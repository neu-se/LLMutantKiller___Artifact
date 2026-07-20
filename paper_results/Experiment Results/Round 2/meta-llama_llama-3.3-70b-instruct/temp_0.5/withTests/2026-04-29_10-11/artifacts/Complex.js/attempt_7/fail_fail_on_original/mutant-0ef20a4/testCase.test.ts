import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when calculating asech of zero', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.asech()).toThrow();
  });
});