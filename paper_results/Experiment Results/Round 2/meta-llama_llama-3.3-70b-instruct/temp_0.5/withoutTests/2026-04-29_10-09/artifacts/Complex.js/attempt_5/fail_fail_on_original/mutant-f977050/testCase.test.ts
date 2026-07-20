import { Complex } from "./complex";

describe("Complex", () => {
  it("should correctly calculate the complex acosh", () => {
    const c = new Complex(2, 0);
    const result = c.acosh();
    expect(result.re).toBeCloseTo(1.3169578969248166, 6);
    expect(result.im).toBeCloseTo(0, 6);
  });
});