import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should not throw an error when calling acos', () => {
    const complex = new Complex(1, 0);
    expect(() => complex.acos()).not.toThrowError();
  });
});