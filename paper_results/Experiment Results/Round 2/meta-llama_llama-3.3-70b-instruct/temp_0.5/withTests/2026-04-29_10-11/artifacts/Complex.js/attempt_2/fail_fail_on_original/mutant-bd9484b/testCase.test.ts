import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate acosh for complex numbers', () => {
    const c = new Complex('1+0i');
    const acosh = c.acosh();
    expect(acosh.re).toBeCloseTo(0, 5);
    expect(acosh.im).toBeCloseTo(0, 5);
  });
});