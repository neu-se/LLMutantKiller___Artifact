import { Complex } from "./complex.js";

describe("Complex", () => {
  it("should return the correct result for the sech function", () => {
    const complex = new Complex(0, 1);
    const result = complex.sech();
    expect(result.re).toBeCloseTo(0.850813299216666);
    expect(result.im).toBeCloseTo(-0.5253355556992579);
  });
});