import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error for invalid property access', () => {
    const complex = new Complex(1, 0);
    expect(() => complex.acosh()).not.toThrow();
    const result = complex.acosh();
    expect(() => result[""]).toThrow(TypeError);
  });
});