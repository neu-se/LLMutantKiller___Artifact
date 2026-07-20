// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_5/pending_category/mutant-5864f5c/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation test", () => {
  it("should correctly distinguish StopIteration from QReturnValue", () => {
    // Create a mock StopIteration exception
    const stopIteration = { toString: () => "[object StopIteration]" };

    // Create a QReturnValue instance
    const QReturnValue = (Q as any).QReturnValue || function(value: any) {
      this.value = value;
    };
    const returnValue = new QReturnValue("test");

    // Test the internal isStopIteration function directly
    const isStopIteration = (Q as any).isStopIteration;

    // In original code: should return true for StopIteration
    expect(isStopIteration(stopIteration)).toBe(true);

    // In original code: should return true for QReturnValue
    expect(isStopIteration(returnValue)).toBe(true);

    // In original code: should return false for normal objects
    expect(isStopIteration({})).toBe(false);

    // In original code: should return false for normal errors
    expect(isStopIteration(new Error("test"))).toBe(false);
  });
});