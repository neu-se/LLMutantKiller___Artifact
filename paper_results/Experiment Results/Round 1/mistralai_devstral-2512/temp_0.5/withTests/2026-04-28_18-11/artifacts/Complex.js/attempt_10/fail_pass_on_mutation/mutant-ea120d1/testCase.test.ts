// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ea120d1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot mutation test", () => {
  it("should expose difference in logHypot computation paths", () => {
    // Test case designed to expose the mutation by forcing different computation paths
    // Original: if (_a < 3000 && _b < 3000) - uses direct computation
    // Mutated:  if (_a < 3000 && _b <= 3000) - uses overflow-safe path for b=3000

    // Create a complex number where b=3000 and a is small
    const c = new Complex(1, 3000);
    const result = c.log();

    // Calculate what the direct computation path would produce
    const directRe = Math.log(Math.sqrt(1*1 + 3000*3000));
    const directIm = Math.atan2(3000, 1);

    // Calculate what the overflow-safe path would produce
    const t = 3000 / 1;
    const safeRe = Math.log(1) + Math.log(1 + t * t) / 2;
    const safeIm = Math.atan2(3000, 1);

    // The original code should use direct path (produce directRe)
    // The mutated code should use safe path (produce safeRe)
    // These values are different enough to detect the mutation
    expect(result.re).toBe(directRe);
    expect(result.im).toBe(directIm);
  });
});