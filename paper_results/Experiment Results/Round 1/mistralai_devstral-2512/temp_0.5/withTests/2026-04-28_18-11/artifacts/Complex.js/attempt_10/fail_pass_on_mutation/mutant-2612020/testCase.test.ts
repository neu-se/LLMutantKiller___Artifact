// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2612020/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers and maintain clean property structure", () => {
    const c = new Complex("5+5i");
    const properties = Object.getOwnPropertyNames(c);
    expect(properties).toEqual(expect.arrayContaining(["re", "im"]));
    expect(properties).not.toContain("");
    expect(c.re).toBe(5);
    expect(c.im).toBe(5);
  });
});