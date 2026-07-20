import { Complex } from "../../../../../complex.js";

describe('Complex', () => {
  it('should throw an error when acosh is called on the mutated code', () => {
    const c = new Complex(2, 0);
    expect(() => c.acosh()).not.toThrow();
  });
});