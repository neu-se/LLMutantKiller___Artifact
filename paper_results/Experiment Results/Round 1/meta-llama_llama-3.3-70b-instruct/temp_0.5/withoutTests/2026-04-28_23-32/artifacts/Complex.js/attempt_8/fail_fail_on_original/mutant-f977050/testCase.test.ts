import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when accessing invalid property', () => {
    const complex = new Complex(1, 0);
    const result = complex.acosh();
    expect(() => result[""]).toThrow();
  });
});