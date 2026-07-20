import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csch()", () => {
  it("should compute the complex cosecant correctly", () => {
    const z = new Complex(1, 1);
    const result = z.csch();
    expect(result.re).toBeCloseTo(-0.3181315052047641, 10);
    expect(result.im).toBeCloseTo(0.4118256116958488, 10);
  });
});