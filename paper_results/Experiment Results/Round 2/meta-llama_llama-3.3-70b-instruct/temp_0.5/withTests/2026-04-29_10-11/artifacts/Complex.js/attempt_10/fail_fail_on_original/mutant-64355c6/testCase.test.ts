import { Complex } from './complex.js';

describe("Complex.js", () => {
  it("should calculate asec correctly when a is zero and b is not zero", () => {
    const complex = new Complex(0, 1);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});