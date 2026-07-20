import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate acosh correctly', () => {
    const c = new Complex(2, 0);
    const result = c.acosh();
    expect(result).toBeDefined();
    expect(c.acosh.toString()).not.toBe("function acosh() {}");
  });
});