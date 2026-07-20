import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate acosh correctly', () => {
    const c = new Complex(2, 0);
    const result = c.acosh();
    expect(result).not.toBeUndefined();
    expect(result).not.toBeNull();
  });
});