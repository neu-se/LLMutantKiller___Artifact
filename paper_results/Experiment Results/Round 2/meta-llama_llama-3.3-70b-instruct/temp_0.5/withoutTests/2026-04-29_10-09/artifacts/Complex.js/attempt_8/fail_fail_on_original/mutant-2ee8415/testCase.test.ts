import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should have re and im properties after asinh', () => {
    const c = new Complex(1, 2);
    c.asinh();
    expect(c).toHaveProperty('re');
    expect(c).toHaveProperty('im');
  });
});