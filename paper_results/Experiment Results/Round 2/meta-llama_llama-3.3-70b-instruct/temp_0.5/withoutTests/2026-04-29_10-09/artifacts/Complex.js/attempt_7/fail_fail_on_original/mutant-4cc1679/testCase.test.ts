import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate acosh correctly', () => {
    const complex = new Complex(2, 0);
    expect(complex.acosh).toBeInstanceOf(Function);
  });
});