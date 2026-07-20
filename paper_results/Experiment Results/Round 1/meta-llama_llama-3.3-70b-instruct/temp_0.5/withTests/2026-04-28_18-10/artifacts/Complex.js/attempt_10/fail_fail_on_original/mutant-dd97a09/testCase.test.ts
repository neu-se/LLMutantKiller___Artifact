import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should not throw an error when sech is called', () => {
    const complex = new Complex(1, 1);
    expect(() => complex.sech()).not.toThrow();
  });
});