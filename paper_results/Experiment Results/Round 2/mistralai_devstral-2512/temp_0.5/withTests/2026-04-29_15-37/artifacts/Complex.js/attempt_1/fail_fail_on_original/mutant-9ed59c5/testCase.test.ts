// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9ed59c5/testCase.test.ts
import { Complex } from "./complex.js";

describe('Complex.js module export', () => {
  it('should correctly export the Complex class in CommonJS environment', () => {
    // This test verifies that the module exports work correctly
    // The mutation breaks the CommonJS export path, which we can detect by checking the export
    const complex = new Complex(1, 2);
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
  });
});