import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString behavior with long stack support", () => {
  it("should preserve stack trace content when long stack support is enabled", async () => {
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      const error = await Q.reject(new Error("test error"))
        .then(null, (err: Error) => err);

      // The stack should contain meaningful content (not be empty)
      // filterStackString is supposed to filter internal frames but keep user frames
      // The mutated version empties the loop body, causing the stack to become empty
      expect(error.stack).toBeTruthy();
      expect(error.stack!.length).toBeGreaterThan(0);
      // The stack should contain something meaningful like the error message or file info
      expect(error.stack).toMatch(/test error|Error/);
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});