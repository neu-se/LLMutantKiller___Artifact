import { Complex } from "../complex.js";

describe("Complex.js", () => {
  it("should calculate the complex sinh correctly", () => {
    const complex = new Complex(1, 0);
    const sinh = complex.sinh();
    expect(sinh.re).toBeCloseTo(Math.sinh(1));
    expect(sinh.im).toBeCloseTo(0);

    // This should fail on the mutated code
    const complex2 = new Complex(100, 0);
    const sinh2 = complex2.sinh();
    expect(sinh2.re).toBeCloseTo(Math.sinh(100));
  });
});