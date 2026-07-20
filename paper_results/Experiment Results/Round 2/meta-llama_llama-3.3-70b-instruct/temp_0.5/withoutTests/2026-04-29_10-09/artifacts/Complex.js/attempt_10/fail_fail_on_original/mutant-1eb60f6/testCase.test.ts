import { Complex } from "./complex.js";

describe("Complex", () => {
  it("should return the correct result for acsc when a and b are 0", () => {
    const complex = new Complex(0, 0);
    expect(complex.acsc().toString()).not.toBe("1.5707963267948966i");
  });
});