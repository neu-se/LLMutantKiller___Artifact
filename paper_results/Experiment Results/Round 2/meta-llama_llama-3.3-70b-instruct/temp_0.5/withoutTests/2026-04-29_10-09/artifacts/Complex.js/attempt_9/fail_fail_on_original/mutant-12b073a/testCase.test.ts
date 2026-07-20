import { Complex } from "../complex";

describe("Complex.js", () => {
  it("should calculate the complex sinh correctly", () => {
    const complex = new Complex(1, 0);
    const sinh = complex.sinh();
    const expected = (Math.exp(1) - Math.exp(-1)) / 2;
    expect(sinh.re).toBeCloseTo(expected);
    expect(sinh.im).toBeCloseTo(0);
  });
});