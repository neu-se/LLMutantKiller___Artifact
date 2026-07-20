// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-34a2ed7/testCase.test.ts
const Complex = require("./complex.js");

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with leading operators", () => {
    const result = new Complex("-3+4i");
    expect(result.re).toBeCloseTo(-3);
    expect(result.im).toBeCloseTo(4);
  });
});