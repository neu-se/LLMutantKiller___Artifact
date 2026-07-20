import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should correctly handle the mutation by accessing the real part", () => {
    const c = new Complex(2, 3);
    const result = c.asech();
    expect(result.re).toBeDefined();
    expect(result.im).toBeDefined();
  });
});