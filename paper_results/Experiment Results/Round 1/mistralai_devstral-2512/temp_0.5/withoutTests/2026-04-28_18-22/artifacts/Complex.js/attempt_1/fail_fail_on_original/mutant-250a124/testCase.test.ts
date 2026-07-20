import { Complex } from "./complex.js";

describe("Complex division", () => {
  it("should correctly divide complex numbers when |c| >= |d|", () => {
    const a = new Complex(4, 6);
    const b = new Complex(2, 1);
    const result = a.div(b);
    expect(result.re).toBeCloseTo(2.6, 10);
    expect(result.im).toBeCloseTo(1.4, 10);
  });
});