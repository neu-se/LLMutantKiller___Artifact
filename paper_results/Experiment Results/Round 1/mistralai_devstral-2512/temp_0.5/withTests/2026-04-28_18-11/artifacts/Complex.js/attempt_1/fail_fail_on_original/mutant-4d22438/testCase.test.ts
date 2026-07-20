// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-4d22438/testCase.test.ts
import { Complex } from "./complex.js";

describe("hypot function mutation test", () => {
  it("should correctly compute hypot for large values where a < b", () => {
    // This test targets the mutation in the hypot function where b = y / x was changed to b = y * x
    // We use values where a < b to trigger the mutated branch
    const a = 1000;
    const b = 2000;
    const c = new Complex(a, b);
    const expectedAbs = Math.sqrt(a * a + b * b);
    expect(c.abs()).toBeCloseTo(expectedAbs);
  });
});