import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should have a property that references itself', () => {
    expect(Object.keys(Complex).length).toBeGreaterThan(0);
    expect(Object.keys(Complex).includes('Complex')).toBe(true);
  });
});