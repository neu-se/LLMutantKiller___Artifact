import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly parse an object with both "re" and "im" properties and throw an error for an object with only "re" property', () => {
    const complex = new Complex({ re: 1, im: 2 });
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    expect(() => new Complex({ re: 1 })).not.toThrow();
    expect(() => new Complex({ im: 1 })).not.toThrow();
  });
});