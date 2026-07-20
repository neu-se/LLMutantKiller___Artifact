import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse a string with only imaginary part and verify internal state consistency", () => {
    const c = new Complex("i");
    expect(c.re).toBe(0);
    expect(c.im).toBe(1);
    expect(c.toString()).toBe("i");
    expect(() => new Complex("2i")).not.toThrow();
  });
});