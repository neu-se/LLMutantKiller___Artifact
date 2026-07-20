import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number initialization", () => {
  it("should correctly handle no arguments", () => {
    const c = new Complex();
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
  });
});