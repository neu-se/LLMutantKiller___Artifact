import { Complex } from "./complex.js";

describe("Complex.acoth", () => {
  it("should return correct result for negative imaginary infinity", () => {
    const result = new Complex(0, -1).acoth();
    expect(result.re).toBe(0);
    expect(result.im).toBe(-Math.PI / 2);
  });
});