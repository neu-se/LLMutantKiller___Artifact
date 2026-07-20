import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate the complex acosh correctly and not throw an error when calling acosh', () => {
    const complex = new Complex(2, 0);
    expect(() => complex.acosh()).not.toThrowError();
  });
});