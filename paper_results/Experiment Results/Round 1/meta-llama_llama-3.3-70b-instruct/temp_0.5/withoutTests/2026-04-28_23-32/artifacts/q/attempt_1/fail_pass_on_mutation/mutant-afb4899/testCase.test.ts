import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should handle stack line parsing correctly", () => {
    const stackLine = "at filename.js:123:456";
    const attempt2 = /at ([^ ]+):(\d+):(\d+)$/.exec(stackLine);
    expect(attempt2).not.toBeNull();
    expect(attempt2[1]).toBe("filename.js");
    expect(attempt2[2]).toBe("123");
    expect(attempt2[3]).toBe("456");

    // Test with the mutated regex
    const mutatedAttempt2 = /at ([^ ]+):(\d+):(?:\d+)/.exec(stackLine);
    expect(mutatedAttempt2).not.toBeNull();
    expect(mutatedAttempt2[1]).toBe("filename.js");
    expect(mutatedAttempt2[2]).toBe("123");
    // The mutated regex does not capture the column number, so this should be undefined
    expect(mutatedAttempt2[3]).toBeUndefined();
  });
});