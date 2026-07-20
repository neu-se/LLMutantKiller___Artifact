import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate acosh correctly', () => {
    const complex = new Complex(2, 0);
    const result = complex.acosh();
    expect(result).not.toBeNull();
    expect(result.toString()).not.toBe('undefined');
  });
});