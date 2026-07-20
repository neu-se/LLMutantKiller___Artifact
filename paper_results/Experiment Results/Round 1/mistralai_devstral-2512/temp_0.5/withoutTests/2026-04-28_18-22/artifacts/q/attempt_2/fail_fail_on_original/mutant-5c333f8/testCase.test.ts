import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace filtering", () => {
  it("should include the starting line in filtered stack traces", () => {
    return Q.reject(new Error("Test error"))
      .catch((error: Error) => {
        const stackLines = error.stack?.split("\n") || [];
        // The stack should include the line where Q.reject was called
        // In the original code, lineNumber >= qStartingLine includes the starting line
        // In the mutated code, lineNumber > qStartingLine excludes the starting line
        expect(stackLines.some(line => line.includes("Q.reject"))).toBe(true);
      });
  });
});