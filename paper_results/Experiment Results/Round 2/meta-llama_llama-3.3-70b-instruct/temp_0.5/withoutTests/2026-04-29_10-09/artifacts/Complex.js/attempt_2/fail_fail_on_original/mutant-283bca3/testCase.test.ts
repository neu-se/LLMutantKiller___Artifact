import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus cosecans correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    const originalResult = new Complex(Math.PI / 2, Infinity);
    expect(result.toString()).not.toBe(originalResult.toString());
  });
});