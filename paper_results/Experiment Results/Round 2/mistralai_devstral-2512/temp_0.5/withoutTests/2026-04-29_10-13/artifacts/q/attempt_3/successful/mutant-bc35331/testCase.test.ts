// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_3/pending_category/mutant-bc35331/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library Node.js environment detection", () => {
  it("should correctly identify Node.js environment", () => {
    // This test verifies that Q correctly identifies a Node.js environment
    // by checking if process.nextTick is used for scheduling
    const originalProcess = global.process;

    // Mock a Node.js-like environment
    global.process = {
      nextTick: (callback: () => void) => callback(),
      toString: () => "[object process]"
    };

    // Create a simple promise and verify it resolves
    let resolved = false;
    Q.resolve().then(() => {
      resolved = true;
    });

    // In a real Node.js environment, this should complete synchronously
    // due to the mock nextTick implementation
    expect(resolved).toBe(true);

    // Restore original process
    global.process = originalProcess;
  });
});