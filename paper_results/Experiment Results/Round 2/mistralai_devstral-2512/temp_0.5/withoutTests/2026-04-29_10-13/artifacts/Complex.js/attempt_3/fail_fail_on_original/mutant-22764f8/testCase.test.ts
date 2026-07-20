import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth method", () => {
  it("should correctly handle acoth computation when real part is accessed", () => {
    const c = new Complex(1.5, 0);
    const result = c.acoth();
    expect(result.re).toBeGreaterThan(0);
    expect(result.im).toBe(0);
  });
});