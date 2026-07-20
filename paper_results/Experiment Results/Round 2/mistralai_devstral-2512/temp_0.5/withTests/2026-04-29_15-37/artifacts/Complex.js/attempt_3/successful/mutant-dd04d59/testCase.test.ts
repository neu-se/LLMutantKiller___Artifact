// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-dd04d59/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should correctly compute the inverse hyperbolic sine of a complex number", () => {
    const c = new Complex(1, 1);
    const result = c.asinh();
    // The expected result is derived from the mathematical definition:
    // asinh(1 + i) = ln(1 + i + sqrt((1 + i)^2 + 1))
    // We can verify this using known properties or by comparing with a reference implementation
    // Here, we check that the result is a valid complex number and has the expected structure
    expect(result.re).toBeCloseTo(1.0612750619050357, 4);
    expect(result.im).toBeCloseTo(0.6662394324925153, 4);
  });
});