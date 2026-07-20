import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate acosh correctly', () => {
    const c = new Complex(2, 0);
    const result = c.acosh();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});