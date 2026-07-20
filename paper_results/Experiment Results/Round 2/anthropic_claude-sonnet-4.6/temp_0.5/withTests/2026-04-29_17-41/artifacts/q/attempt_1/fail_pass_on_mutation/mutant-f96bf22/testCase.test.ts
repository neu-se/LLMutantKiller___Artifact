import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString behavior", () => {
  it("should filter out empty lines from stack traces when long stack support is enabled", async () => {
    Q.longStackSupport = true;

    try {
      const error = await Q.reject(new Error("test error"))
        .then(() => {})
        .fail((err: Error) => {
          return err;
        });

      // The stack should not contain consecutive newlines (empty lines)
      // Original code filters out empty/falsy lines with `&& line` check
      // Mutated code uses `if (true)` which includes empty lines
      const stack = (error as Error).stack || "";
      
      // With the original code, empty lines are filtered out
      // With the mutated code, empty lines are included, resulting in consecutive newlines
      expect(stack).not.toMatch(/\n\n/);
    } finally {
      Q.longStackSupport = false;
    }
  });
});