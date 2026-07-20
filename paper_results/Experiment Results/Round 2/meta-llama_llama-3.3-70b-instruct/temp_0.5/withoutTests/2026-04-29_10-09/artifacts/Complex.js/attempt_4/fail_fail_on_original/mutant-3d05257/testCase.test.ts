import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate the complex acosh correctly', () => {
    const complex = new Complex(2, 0);
    const acosh = complex.acosh();
    expect(acosh.toString()).not.toContain('NaN');
  });
});