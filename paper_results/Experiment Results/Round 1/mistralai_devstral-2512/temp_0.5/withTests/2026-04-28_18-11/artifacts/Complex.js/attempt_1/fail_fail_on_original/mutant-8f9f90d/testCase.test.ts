import { Complex } from "./complex";

describe("Complex.atanh", () => {
  it("should correctly compute atanh of a complex number", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0.5 * Math.log(1.5) - 0.25 * Math.PI, 10);
    expect(result.im).toBeCloseTo(0.25 * Math.log(5), 10);
  });
});