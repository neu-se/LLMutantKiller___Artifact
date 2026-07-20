// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f282a3d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with uppercase 'I' and reject empty string", () => {
    const c1 = new Complex("3+2I");
    expect(c1.re).toBe(3);
    expect(c1.im).toBe(2);

    // This should fail on the mutated code because it would incorrectly parse empty string as 'I'
    const c2 = new Complex("3+");
    expect(c2.re).toBe(3);
    expect(c2.im).toBe(0);
  });
});