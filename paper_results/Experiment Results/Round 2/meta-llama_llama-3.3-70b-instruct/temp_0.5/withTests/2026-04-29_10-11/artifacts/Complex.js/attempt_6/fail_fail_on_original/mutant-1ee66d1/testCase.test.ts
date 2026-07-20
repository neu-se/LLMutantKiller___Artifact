import { Complex } from '../../../complex.js';

describe("Complex.js", () => {
  it("should correctly calculate the complex arcus cosecans", () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(0);
  });
});