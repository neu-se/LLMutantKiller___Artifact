import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate csc correctly', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.csc()).not.toThrowError();
  });
});