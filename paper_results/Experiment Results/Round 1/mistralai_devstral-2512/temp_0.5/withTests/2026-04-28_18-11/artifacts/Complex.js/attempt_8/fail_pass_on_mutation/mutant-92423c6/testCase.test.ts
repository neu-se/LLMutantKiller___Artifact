// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-92423c6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    // Test case that directly exercises the cosm1 function through expm1
    // The mutation changes the sign of the last term in the Taylor series
    const x = 0.0000001; // Extremely small value that triggers Taylor series
    const c = new Complex(x, 0);
    const result = c.expm1();
    // The mutation affects cosm1 which is used in expm1
    // For extremely small x, the difference between original and mutated will be most pronounced
    // Using exact string comparison to catch the mutation
    const expected = Math.expm1(x).toPrecision(20);
    const actual = result.re.toPrecision(20);
    expect(actual).toBe(expected);
  });
});