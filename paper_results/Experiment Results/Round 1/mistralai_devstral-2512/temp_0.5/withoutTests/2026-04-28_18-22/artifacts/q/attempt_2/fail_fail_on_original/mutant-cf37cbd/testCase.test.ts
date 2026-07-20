// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-cf37cbd/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with multi-digit column numbers", () => {
    // Create a scenario that will generate a stack trace with multi-digit column numbers
    // The mutation changes the regex from (?:\d+) to (?:\d) which would fail to match
    // multi-digit column numbers properly in stack traces
    const error = new Error("Test error");
    const stackLine = "at http://localhost:8080/test.js:123:456"; // Multi-digit column number

    // Access the internal function through Q's implementation
    // This tests the getFileNameAndLineNumber function which uses the mutated regex
    const getFileNameAndLineNumber = (Q as any).getFileNameAndLineNumber;
    const result = getFileNameAndLineNumber(stackLine);

    // The original code should correctly parse this line
    expect(result).toEqual(["http://localhost:8080/test.js", 123]);
  });
});