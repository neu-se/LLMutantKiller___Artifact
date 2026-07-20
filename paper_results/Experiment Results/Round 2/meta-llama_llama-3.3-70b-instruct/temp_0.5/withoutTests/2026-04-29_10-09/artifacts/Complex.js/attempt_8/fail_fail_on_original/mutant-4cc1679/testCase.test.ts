import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate acosh correctly', () => {
    const complex = new Complex(2, 0);
    expect(() => complex.acosh()).not.toThrow();
  });
});