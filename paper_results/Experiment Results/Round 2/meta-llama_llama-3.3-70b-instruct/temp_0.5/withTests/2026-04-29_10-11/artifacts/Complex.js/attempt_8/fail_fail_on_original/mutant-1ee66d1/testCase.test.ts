import { Complex } from '../complex';

describe("Complex.js", () => {
  it("should correctly calculate the complex arcus cosecans", () => {
    const complex = new Complex(1, 0);
    const result = complex.acsc();
    expect(result.toString()).not.toBe('NaN');
  });
});