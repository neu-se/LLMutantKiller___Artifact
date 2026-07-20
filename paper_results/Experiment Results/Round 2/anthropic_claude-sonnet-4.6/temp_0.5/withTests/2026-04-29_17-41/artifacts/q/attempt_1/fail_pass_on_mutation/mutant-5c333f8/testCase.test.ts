import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack trace filtering", () => {
  it("should include the From previous event separator when long stack support is enabled", async () => {
    Q.longStackSupport = true;

    try {
      const result = await Q.Promise((resolve, reject) => {
        Q().then(() => {
          throw new Error("test error");
        }).catch(reject);
      }).catch((err: Error) => {
        return err;
      });

      const error = result as Error;
      
      // With long stack support, the stack should contain the separator
      // and should NOT contain Q internal frames at qStartingLine
      // The original code filters frames at lineNumber >= qStartingLine
      // The mutated code only filters lineNumber > qStartingLine
      // This means with the mutation, the frame at exactly qStartingLine leaks through
      
      // The key observable difference: with long stacks enabled,
      // the stack trace should contain "From previous event:"
      expect(error.stack).toContain("From previous event:");
      
      // The stack should not contain Q's own file references mixed in
      // in a way that breaks the "From previous event:" structure
      const parts = error.stack!.split("From previous event:");
      // There should be at least 2 parts (before and after the separator)
      expect(parts.length).toBeGreaterThanOrEqual(2);
    } finally {
      Q.longStackSupport = false;
    }
  });
});