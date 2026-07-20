import { Complex } from "./complex.js";

describe("Complex", () => {
  it("should calculate acosh correctly and not throw error when accessing result.re", () => {
    const complex = new Complex(2, 0);
    const result = complex.acosh();
    expect(result).toHaveProperty("re");
  });
});