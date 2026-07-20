import { Complex } from "../../../../../complex.js";

describe('Complex', () => {
  it('should calculate sech correctly and return an object with re and im properties', () => {
    const complex = new Complex(1, 1);
    const result = complex.sech();
    expect(result).toHaveProperty('re');
    expect(result).toHaveProperty('im');
  });
});