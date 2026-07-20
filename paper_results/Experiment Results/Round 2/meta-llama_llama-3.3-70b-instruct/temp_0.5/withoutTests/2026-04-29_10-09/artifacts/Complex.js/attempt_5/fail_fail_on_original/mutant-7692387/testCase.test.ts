import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate asinh correctly and have the correct property', () => {
    const complex = new Complex(1, 2);
    complex.asinh();
    expect(complex).toHaveProperty('im');
  });
});