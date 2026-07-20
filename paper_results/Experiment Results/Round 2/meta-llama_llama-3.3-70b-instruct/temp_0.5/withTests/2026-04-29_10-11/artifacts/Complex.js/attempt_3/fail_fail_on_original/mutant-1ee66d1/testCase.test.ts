import { Complex } from './complex.js';

describe("Complex.js", () => {
  it("should correctly calculate the complex arcus cosecans", () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(result.toString()).not.toBe('0 + 0i');
  });
});