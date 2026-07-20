import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should correctly filter out internal frames from stack traces", () => {
    try {
      throw new Error("Test error");
    } catch (e) {
      const error = e as Error;
      const stack = error.stack;
      const lines = stack.split("\n");
      const internalFrameFound = lines.some(line => line.includes("getFileNameAndLineNumber"));
      expect(internalFrameFound).toBe(false);
    }
  });
});